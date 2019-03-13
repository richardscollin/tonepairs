#!/usr/bin/env python3
import sys
import csv

import cedict

def parse_file(filename, foo):
    with open(filename, "r", newline='', encoding="utf-8-sig") as f:
        reader = csv.reader(f, delimiter='\t')
        for row in reader:
            if len(row) == 0 or row[0].startswith("//"):
                continue

            assert(len(row) == 2)

            (character, pinyin) = row
            (simplified, traditional) = character.strip(']').split('[')
            foo(simplified, traditional, pinyin)

warning_count = 0
pair_list = []
def bar(simplified, traditional, pinyin):
    global pair_list
    global dictionary
    global warning_count
    if (len(simplified) == 2):
        entry = dictionary.get(simplified)
        if (entry):
            english = entry[3]
            pair_list.append((simplified, traditional, pinyin, english))
        else:
            warning_count += 1
            print("Warning: skipping " + simplified + " not found in dict")

if __name__ == "__main__":
    filename = sys.argv[1]
    dictionary = cedict.cedict()
    parse_file(filename, bar)
    print("[")
    for pair in pair_list:
        print('["{}", "{}", "{}", "{}"],'.format(pair[0], pair[1], pair[2], pair[3]))
    print("]")
    print("Bad dictionary lookups: " + str(warning_count))
