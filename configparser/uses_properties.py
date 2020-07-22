from configparser import ConfigParser

props = ConfigParser()
props.read('properties.ini')

client_secret = props.get('credentials', "CLIENT_SECRET")
print(client_secret)

log_path = props.get('paths', "LOG_PATH")
print(log_path)
