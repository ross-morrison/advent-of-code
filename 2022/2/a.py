input = open('2022/2/input-a.txt', 'r')
lines = input.readlines()

result_table = [
    [4, 8, 3],
    [1, 5, 9],
    [7, 2, 6],
]

total = 0
for line in lines:
    moves = line.split(' ')
    opponent = ord(moves[0].strip()) - 65
    my_move = ord(moves[1].strip()) - 88

    total += result_table[opponent][my_move]

print(total)
