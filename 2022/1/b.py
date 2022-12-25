input = open('2022/1/input-a.txt', 'r')

# Split into groups by \n\n
groups = input.read().split('\n\n')

# Sum each group and find the top 3 highest sums, then sum them
sumOfTop3 = sum(sorted((sum(map(int, group.split('\n'))) for group in groups), reverse=True)[:3])

print(sumOfTop3)
