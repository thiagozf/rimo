<img src="https://raw.githubusercontent.com/thiagozf/rimo/master/rimo.png" alt="rimo banner" align="center" />

<br />

<div align="center"><strong>Build rich domain models with Rimo!</strong></div>
<div align="center">Rimo is a set of utilities that helps you to implement a clean architecture in TypeScript.</div>

<br />

<div align="center">
  <!-- NPM Package -->
  <a href="https://badge.fury.io/js/rimo">
    <img src="https://badge.fury.io/js/rimo.svg" alt="NPM Package" />
  </a>
  <!-- Install Size -->
  <a href="https://packagephobia.now.sh/result?p=rimo">
    <img src="https://packagephobia.now.sh/badge?p=rimo" alt="Install Size" />
  </a>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/thiagozf/rimo">
    <img src="https://david-dm.org/thiagozf/rimo.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/thiagozf/rimo#info=devDependencies">
    <img src="https://david-dm.org/thiagozf/rimo/dev-status.svg" alt="devDependency Status" />
  </a>
  <!-- Prettier -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="styled with prettier" />
  </a>
  <!-- Snyk -->
  <a href="https://snyk.io/test/github/thiagozf/rimo">
    <img src="https://snyk.io/test/github/thiagozf/rimo/badge.svg" />
  </a>
  <!-- Coveralls -->
  <a href="https://coveralls.io/github/thiagozf/rimo">
    <img src="https://img.shields.io/coveralls/thiagozf/rimo.svg" />
  </a>
  <!-- Travis -->
  <a href="https://travis-ci.org/thiagozf/rimo">
    <img src="https://img.shields.io/travis/thiagozf/rimo.svg" />
  </a>
</div>

<br />
<div align="center">
  <sub>Created by <a href="https://github.com/thiagozf">Thiago Zanivan</a> and maintained with ❤️ by an amazing <a href="#credits">community</a>.</sub>
</div>

## Usage

```typescript
import { AggregageRoot } from 'rimo'

// Create an aggregate root
class User extends AggregateRoot<{ email: string }> {
  get email() {
    return this.props.email
  }
}

// Define inputs and/or outputs
class CreateUserInput {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  static populate = (data: any) => {
    return Object.assign(new CreateUserInput(), data)
  }
}

// Create a use case
import { CommandHandler, Use } from 'rimo'

class CreateUserCommand implements CommandHandler<CreateUserInput, User> {
  @Use(ValidateCommand)
  async handle(input: CreateUserInput): Promise<User> {
    const user: User = new User(input)
    // persist user, do other stuff
    return user
  }
}

// Keep your use cases clean with the help of middlewares
// to do things like validation
import { Middleware } from 'rimo'

class ValidateCommand implements Middleware<CreateUserInput> {
  async use(event: CreateUserInput) {
    const errors = await validate(event)
    if (errors.length > 0) {
      throw new Error('validation error')
    }
  }
}

// Use the stupid simple, yet powerful, pub/sub mechanism that Rimo
// provides to keep your application components nicely decoupled!
import { AfterCommand, CommandRunner } from 'rimo'

class CreateUserSubscriber {
  @AfterCommand(CreateUserCommand)
  async afterCreateUser(user: User, runner: CommandRunner) {
    // SendWelcomeEmail is another use case
    await runner.run(SendWelcomeEmail, user)
  }
}
```

## Credits

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://thiagozf.com"><img src="https://avatars2.githubusercontent.com/u/4684137?v=4" width="100px;" alt=""/><br /><sub><b>Thiago Zanivan</b></sub></a><br /><a href="https://github.com/thiagozf/rimo/commits?author=thiagozf" title="Code">💻</a> <a href="#tool-thiagozf" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind are welcome!
