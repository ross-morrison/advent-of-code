input = open('2022/1/input-a.txt', 'r')

# Split into groups by \n\n
groups = input.read().split('\n\n')

# Sum each group and find the highest sum
maxValue = max(sum(map(int, group.split('\n'))) for group in groups)

print(maxValue)
