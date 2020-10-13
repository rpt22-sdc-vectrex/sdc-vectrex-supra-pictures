#!/bin/sh
for i in {1..100}
do
   /Applications/'Couchbase Server.app'/Contents/Resources/couchbase-core/bin/cbimport json -c couchbase://127.0.0.1 -u Administrator -p 123456  -b sdcpic -d "file:///Users/supra/1_Supra/Projects/HackReactor/sdc/Zachary-Romsdahl-Pictures/couchbase/jsonfiles/pics$i.json" -f list -g key::%item_id% -t 4
done




