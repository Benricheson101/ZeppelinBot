![Zeppelin Banner](assets/zepbanner.png)
# Zeppelin
Zeppelin is a moderation bot for Discord, designed with large servers and reliability in mind.

**Main features include:**
- Extensive automoderator features (automod)
  - Word filters, spam detection, etc.
- Detailed moderator action tracking and notes (cases)
- Customizable server logs
- Tags/custom commands
- Reaction roles
- Tons of utility commands, including a granular member search
- Full configuration via a web dashboard
  - Override specific settings and permissions on e.g. a per-user, per-channel, or per-permission-level basis
- Bot-managed slowmodes
  - Automatically switches between native slowmodes (for 6h or less) and bot-enforced (for longer slowmodes)
- Starboard
- And more!

See https://zeppelin.gg/ for more details.

## Changes from Upstream:
- Allow yaml anchors
  - Top-level `alias` key
- Docker support
- Support for formatted timestamps

### Running the bot with Docker:
1. Configure `backend/{bot,api}.env`,`dashboard/.env` and `backend/init_db.sh`
2. `docker-compose up mariadb`
2. `docker-compose up -d`
3. `./backend/init_db.sh`

**NOTE:** if the bot and API give an error saying they can't connect to the database even though it is running, run `docker-compose restart bot api`. Sometimes Docker Compose starts them before the database is running

## Usage documentation
For information on how to use the bot, see https://zeppelin.gg/docs

## Development
See [DEVELOPMENT.md](./DEVELOPMENT.md) for instructions on running the development environment.

Once you have the environment up and running, see [MANAGEMENT.md](./MANAGEMENT.md) for how to manage your bot.

## Production
See [PRODUCTION.md](./PRODUCTION.md) for instructions on how to run the bot in production.

Once you have the environment up and running, see [MANAGEMENT.md](./MANAGEMENT.md) for how to manage your bot.
