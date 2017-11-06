require 'rvm/capistrano'        # Load RVM and Capistrano integration
require 'bundler/capistrano'  # Add Bundler integration
load 'deploy/assets'  # only for rails 3.1 apps, this makes sure our assets are precompiled.

# SSH Port
set :port, 443

# Define que o RVM foi instalado para o sistema
set :rvm_type, :system

set :application, "toguro"

set :repository,  "ssh://git@bitbucket.org/calimaborges/toguro.git"
set :branch, "master"
set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

set :location, "carlosborg.es"

role :web, location                          # Your HTTP server, Apache/etc
role :app, location                          # This may be the same as your `Web` server
role :db,  location, :primary => true # This is where Rails migrations will run

set :user, "deploy"
set :deploy_to, "/var/www/#{application}"
set :deploy_via, :remote_cache
set :use_sudo, false
ssh_options[:keys] = ["#{ENV['HOME']}/.ssh/quiborgue-deploy.pem"]

# role :db,  "your slave db-server here"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end