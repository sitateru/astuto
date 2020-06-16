#!/bin/ash
set -xeuo pipefail

is_rails=$(echo "$@" | grep -Eqs '\b(rails)\b' && echo 'true' || echo 'false')

if [ "$is_rails" = "true" ]; then
  # Setup environment variables
  export RAILS_ENV="${ENVIRONMENT:-production}"
  export NODE_ENV="${ENVIRONMENT:-production}"

  # Initialize database
  bundle exec rails db:create
  db_version=$(bundle exec rake db:version)
  if [ "$db_version" = "Current version: 0" ]; then
    bundle exec rails db:setup
  else
    bundle exec rails db:migrate
  fi
fi

exec "$@"
