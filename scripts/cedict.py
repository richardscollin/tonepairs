#!/usr/bin/env python3
import sys
import csv

def parse_file(filename, foo):
    with open(filename, "r", newline='', encoding="utf-8") as f:
        i = 0
        for line in f.readlines():
            line = line.strip()
            if len(line) == 0 or line[0] == '#':
                continue
            data = line.replace(' ','/',1).replace(" [","/",1).replace("]","/",1).split("/")
            data = [d for d in data if len(d.strip())]
            foo(data)

pair_dictionary = {}
def bar(data):
    global pair_list
    if len(data) == 5:
        (simplified, traditional, pinyin, def1, def2) = data
    elif len(data) == 4:
        (simplified, traditional, pinyin, def1) = data
    else:
        simplified = data[0]

    if len(simplified) != 2: return
    pair_dictionary[simplified] = data

def cedict():
    global pair_dictionary
    filename = "cedict_1_0_ts_utf-8_mdbg.txt"
    parse_file(filename, bar)
    return pair_dictionary

if __name__ == "__main__":
    filename = sys.argv[1]
    parse_file(filename, bar)
