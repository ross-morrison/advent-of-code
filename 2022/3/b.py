input = open('2022/3/input-a.txt', 'r')
lines = input.readlines()

def get_priority(c):
    if c.isupper():
        return ord(c) - ord('A') + 26 + 1
    return ord(c) - ord('a') + 1

score = 0
i = 0
while i < len(lines):
    for c in lines[i]:
        if c in lines[i+1] and c in lines[i+2]:
            score += get_priority(c)
            break
    i += 3

print(score)
