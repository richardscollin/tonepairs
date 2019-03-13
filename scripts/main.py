#!/usr/bin/env python3
import sys
import csv
import json

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

def is_unicode(string):
    try:
        string.encode().decode('ascii')
    except UnicodeDecodeError:
        return True
    else:
        return False

def strip_ascii(string):
    result = ""
    for l in string:
        if len(l.encode()) > 1:
            result += l
    return result

def follow_references(entry, dictionary):
    """Annoyingly some english definitions are of the form:
    "see 作主[zuo4 zhu3]"
    The purpose of this function is to resolve these to english definitions
    """
    english = entry[3]
    if "see" in english and is_unicode(english):
        stripped = strip_ascii(english)
        lookup = stripped[:2]
        new_entry = dictionary.get(lookup)
        if not new_entry:
            print("Warning: double reference failed" + entry, file=sys.stderr)
        else:
            entry[3] = new_entry[3]
    return entry


warning_count = 0
pair_list = []
def bar(simplified, traditional, pinyin):
    global pair_list
    global dictionary
    global warning_count
    if (len(simplified) == 2):
        entry = dictionary.get(simplified)
        if (entry):
            entry = follow_references(entry, dictionary)
            english = entry[3]
            pair_list.append([simplified, traditional, pinyin, english])
        else:
            warning_count += 1
            print("Warning: skipping " + simplified + " not found in dict", file=sys.stderr)

if __name__ == "__main__":
    filename = sys.argv[1]
    dictionary = cedict.cedict()
    parse_file(filename, bar)
    print(json.dumps(pair_list, ensure_ascii=False))
    print("Bad dictionary lookups: " + str(warning_count), file=sys.stderr)
