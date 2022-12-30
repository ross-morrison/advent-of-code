input = open('2022/3/input-a.txt', 'r')
lines = input.readlines()

def get_priority(c):
    if c.isupper():
        return ord(c) - ord('A') + 26 + 1
    return ord(c) - ord('a') + 1

score = 0
for line in lines:
    first_half, second_half = line[:len(line)//2], line[len(line)//2:]

    for c in first_half:
        if c in second_half:
            score += get_priority(c)
            break

print(score)
