import json
import sys

if len(sys.argv) > 1:
	hstr = sys.argv[1]
else:
	for line in sys.stdin:
		hstr = line.strip()
		print(hstr)
		if 'Exit' == line.rstrip():
			break

ret = ['0x' + hstr[i] + hstr[i+1] for i in range(0, len(hstr), 2)]
sys.stdout.write(json.dumps(ret))
