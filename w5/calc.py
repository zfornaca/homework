def calc(s):
    """Takes a string of prefix/polish input (operator, one integer, a second integer, all separated by
        a single space [e.g. '+ 2 3']) and returns the result of applying that operator to those integers.

        >>> calc("+ 1 2")
        3

    For division and subtraction, note that the order of the integers is important. '/ 1 2' will return 
    0.5 (1/2), not 2 (2/1).

        >>> calc("/ 1 2")
        0.5

        >>> calc("* 5 2")
        10

        >>> calc("- 3 4")
        -1

    """

    # Convert to list of tokens
    #
    # For example: "+ 1 2" -> ["+", "1", "2"]
    tokens = s.split()

    # Start with right-most number (in a well-formed polish notation
    # expression, it must ALWAYS end with a number)
    operand2 = int(tokens.pop())

    while tokens:
        # Grab the right-most number
        operand1 = int(tokens.pop())

        # Grab the right-most operand
        operator = tokens.pop()

        # Do the math and use the result as our "right-hand" value
        # for the next time we do math

        if operator == "+":
            operand2 = operand1 + operand2

        elif operator == "-":
            operand2 = operand1 - operand2

        elif operator == "*":
            operand2 = operand1 * operand2

        elif operator == "/":
            operand2 = operand1 / operand2

    # The final result is the result of the most recent operation

    return operand2
