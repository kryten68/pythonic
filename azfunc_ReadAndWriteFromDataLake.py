import azure.functions as func

## Required for Azure Data Lake Storage Gen1 filesystem management
from azure.datalake.store import core, lib, multithread

## Remember to add the extra modules to be imported into requirements.txt
ten_id = '<tenant id>'
cli_secret = '<client secret>'
cli_id = '<client id>'
adl_account = '<name of datalake>'
path = '/<container>/<filename.json>'

token = lib.auth(tenant_id=ten_id, client_secret=cli_secret, client_id=cli_id)
adls_client = core.AzureDLFileSystem(token, store_name=adl_account)

with adls_client.open(path, 'rb') as f:
    file_contents = f.read()
    file_contents_string = file_contents.decode('utf-8')
    
with adls_client.open("/stan/newfile.json",'wb') as w:
    w.write(file_contents)
    w.close()
