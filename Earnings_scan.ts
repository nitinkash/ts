Input l1 = 5;
Input l2 = 21;

def when = hasearnings();
def not_have = sum(when,l1)[-l1+1];
def have =sum(when,l2)[-l2+1];
plot scan;
def scan1 = sum(when,l1)[-l1+1] == 0;
def scan2 = sum(when,l2)[-l2+1] > 0;
scan = scan1 is true && scan2 is true;
