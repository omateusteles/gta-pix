fx_version 'cerulean'

games { 'gta5' }

dependency 'webpack'
dependency 'yarn'

webpack_config 'client.config.js'
webpack_config 'server.config.js'

client_script 'dist/client.js'
client_script 'src/client/bank_marker.lua'
server_script 'src/server/server.lua'