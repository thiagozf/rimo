import { IsNotEmpty, IsEmail, validate } from 'class-validator'
import { Middleware, CommandRunner, RunnerCommandHandler, CommandHandler } from '@rimo/command'
import { Use, BeforeCommand, AfterCommand } from '@rimo/decorators'
import { Entity } from '@rimo/core'

import { DefaultContainer } from '@rimo/container'

/**
 * CommandRunner test
 */
describe('CommandRunner test', () => {
  describe('Acceptance test', () => {
    let runner: CommandRunner
    let watchers: {
      before: number[]
      after: number[]
    }

    beforeEach(() => {
      runner = new CommandRunner()
      watchers = {
        before: [],
        after: [],
      }
    })

    class User extends Entity<{ email: string }> {
      get email() {
        return this.props.email
      }
    }

    class CreateUserInput {
      @IsNotEmpty()
      @IsEmail()
      email!: string

      static populate = (data: any) => {
        return Object.assign(new CreateUserInput(), data)
      }
    }

    class ValidateCommand implements Middleware<CreateUserInput> {
      async use(event: CreateUserInput) {
        const errors = await validate(event)
        if (errors.length > 0) {
          throw new Error('validation error')
        }
      }
    }

    class CreateUserCommand extends RunnerCommandHandler<CreateUserInput, User> {
      @Use(ValidateCommand)
      async handle(input: CreateUserInput): Promise<User> {
        return new User(input)
      }
    }

    class CreateUserSubscriber {
      @BeforeCommand(CreateUserCommand, { priority: 0 })
      async beforeCreateUser(input: CreateUserInput) {
        watchers.before.push(0)
      }

      @BeforeCommand(CreateUserCommand, { priority: 1 })
      async beforeCreateUser2(input: CreateUserInput) {
        watchers.before.push(1)
      }

      @BeforeCommand(CreateUserCommand, { priority: 2 })
      async beforeCreateUser3(input: CreateUserInput) {
        watchers.before.push(2)
      }

      @AfterCommand(CreateUserCommand)
      async afterCreateUser(user: User) {
        watchers.after.push(0)
      }
    }

    it('should execute middlewares (use)', async () => {
      const input = CreateUserInput.populate({})
      await expect(runner.run(CreateUserCommand, input)).rejects.toThrowError()
    })

    it('should notify subscribers', async () => {
      const input = CreateUserInput.populate({ email: 'hi+github@thiagozf.com' })
      const output = await runner.run(CreateUserCommand, input)
      expect(watchers.before).toStrictEqual([2, 1, 0])
      expect(watchers.after).toHaveLength(1)
    })
  })

  describe('Custom container', () => {
    interface Email {
      value: string
    }

    class RegisterEmailCommand implements CommandHandler<string, Email> {
      async handle(value: string): Promise<Email> {
        return { value }
      }
    }

    it('should run', async () => {
      const runner = new CommandRunner({ container: new DefaultContainer() })
      const output = await runner.run(RegisterEmailCommand, 'hi+github@thiagozf.com')
      expect(output.value).toBe('hi+github@thiagozf.com')
    })
  })
})
