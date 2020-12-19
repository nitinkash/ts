# BJ_MACDWithBBLinesStudy
# By Bharath Jayaram
# Last Update 27 Dec 2014

declare lower;

input price = close;
input BBlength = 10;
input BBNum_Dev = 1.0;
input MACDfastLength = 12;
input MACDslowLength = 26;
input MACDLength = 5;

def MACD_Data = MACD(fastLength = MACDfastLength, slowLength = MACDslowLength, MACDLength = MACDLength);

def MACD_Dots = MACD_Data;
def MACD_Line = MACD_Data;

def BB_Upper = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).UpperBand;
def BB_Lower = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).Lowerband;
def BB_Midline = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).MidLine;

# MACD_Dots.AssignValueColor(if MACD_Line > MACD_Line[1] then Color.GREEN else Color.RED);

## def Scan = if MACD_Line > 0 && MACD_Dots > BB_Upper; # Buy
## Scan if MACD_Line < 0 && MACD_Dots < BB_Lower; # Sell

def displace = 0;
def MA1_length = 9;
def MA2_length = 9;

def data1 = compoundValue(1, hullMovingAvg(price[-displace], MA1_length), price);

def DoubleMA;

DoubleMA = compoundValue(1, VariableMA( data1, MA2_length), data1);

#DoubleMA.AssignValueColor(if DoubleMA > DoubleMA[1] then Color.BLUE else Color.white);

#def Scan = if DoubleMA > DoubleMA[1]; # BUY
##Scan = if DoubleMA < DoubleMA[1]; # SELL

plot Scan = (DoubleMA > DoubleMA[1]) and (MACD_Line > 0) && (MACD_Dots > BB_Upper) and (MACD_Dots[1] <= BB_Upper[1]);# BUY
## Scan if not signal # SELL
