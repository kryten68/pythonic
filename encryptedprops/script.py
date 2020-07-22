from flask import Flask
from datetime import datetime
from passlib.hash import cisco_type7

## Required for Azure Data Lake Storage Gen1 filesystem management
from azure.datalake.store import core, lib, multithread

app = Flask(__name__)
app.config.from_object('config.SecureConfig')

tenant_id       = cisco_type7.decode(app.config["TENANT_ID"])
client_id       = cisco_type7.decode(app.config["CLIENT_ID"])
client_secret   = cisco_type7.decode(app.config["CLIENT_SECRET"])
adl_account     = cisco_type7.decode(app.config["ADL_ACCOUNT"])
adl_path        = cisco_type7.decode(app.config["ADL_PATH"])
hashed_pass       = cisco_type7.decode(app.config["HASH_P"])

print("tenant_id ", tenant_id)
print("client_id ", client_id)
print("client_secret ", client_secret)
print("adl_account ", adl_account)
print("adl_path ", adl_path)
print("hashed pass ", hashed_pass)

token = lib.auth(
    tenant_id       =tenant_id, 
    client_secret   =client_secret, 
    client_id       =client_id)

adls_client = core.AzureDLFileSystem(token, store_name=adl_account)

@app.route('/')
def hello_world():
    # name = app.config["USER"] 
    
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S:%s")
    print("PreTime =", current_time)
    
    with adls_client.open(adl_path
                          , 'rb') as f:
        file_contents = f.read()
    
    file_contents_string = file_contents.decode('utf-8')
    
    now = datetime.now()
    current_time = now.strftime("%H:%M:%S:%s")
    print("PreTime =", current_time)
    
    t = file_contents_string   
    return t

if '__name__' == '__main__':
    app.run()
