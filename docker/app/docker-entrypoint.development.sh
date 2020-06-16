#!/bin/ash
set -xeuo pipefail

is_rails=$(echo "$@" | grep -Eqs '\b(rails)\b' && echo 'true' || echo 'false')

if [ "$is_rails" = "true" ]; then
  # Setup environment variables
  export RAILS_ENV="${ENVIRONMENT:-development}"
  export NODE_ENV="${ENVIRONMENT:-development}"

  # Install gems
  bundle install

  # Install node modules
  yarn install --check-files

  # Remove server.pid
  [ -f "/astuto/tmp/pids/server.pid" ] && rm /astuto/tmp/pids/server.pid

  # Initialize database
  bundle exec rails db:create
  db_version=$(bundle exec rake db:version)
  if [ "$db_version" = "Current version: 0" ]; then
    bundle exec rails db:setup
  else
    bundle exec rails db:migrate
  fi

  # Compile assets
  if [ "$RAILS_ENV" = "production" ]; then
    bundle exec rails assets:precompile
  fi
fi

exec "$@"
