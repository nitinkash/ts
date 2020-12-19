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

plot MACD_Dots = MACD_Data;
plot MACD_Line = MACD_Data;

plot BB_Upper = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).UpperBand;
plot BB_Lower = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).Lowerband;
plot BB_Midline = reference BollingerBands(price = MACD_Line, length = BBlength, Num_Dev_Dn = -BBNum_Dev, Num_Dev_Up = BBNum_Dev).MidLine;

BB_Lower.SetDefaultColor(Color.YELLOW);
BB_lower.SetLineWeight(2);
BB_Upper.SetDefaultColor(Color.YELLOW);
BB_Upper.SetLineWeight(2);
BB_Midline.SetDefaultColor(GetColor(1));
BB_Midline.SetStyle(Curve.SHORT_DASH);

MACD_Line.SetDefaultColor(Color.WHITE);

MACD_Dots.SetStyle(Curve.POINTS);
MACD_Dots.SetLineWeight(2);
MACD_Dots.AssignValueColor(if MACD_Line > MACD_Line[1] then Color.GREEN else Color.RED);

plot zero = 0;
zero.AssignValueColor(if MACD_Line < 0 then Color.RED else Color.GREEN);
zero.SetLineWeight(2);
