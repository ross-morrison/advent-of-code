input = open('2022/2/input-a.txt', 'r')
lines = input.readlines()

result_table = [
    [3, 4, 8],
    [1, 5, 9],
    [2, 6, 7],
]

total = 0
for line in lines:
    moves = line.split(' ')
    opponent = ord(moves[0].strip()) - 65
    my_move = ord(moves[1].strip()) - 88

    total += result_table[opponent][my_move]

print(total)
