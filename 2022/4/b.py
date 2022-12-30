input = open('2022/4/input-a.txt', 'r')
lines = input.readlines()

score = 0
for line in lines:
    left, right = line.split(',')

    leftStart, leftEnd = map(int, left.split('-'))
    rightStart, rightEnd = map(int, right.split('-'))

    if (leftStart >= rightStart and leftStart <= rightEnd) or (rightStart >= leftStart and rightStart <= leftEnd):
        score += 1

print(score)
