import sys
import json

print sys.argv[2]
request = json.loads(sys.argv[2])
print request