# BJ_Stochastic_v2Study
# A customised stochastic indicator.
# By Bharath Jayaram
# Last Update 1 Aug 2016

declare lower;
#input MidLine1 = 55;
#input MidLine2 = 45;
input over_bought = 80;
input over_sold = 20;
input KPeriod = 3;
input DPeriod = 3;
input priceH = high;
input priceL = low;
input priceC = close;
input slowing_period = 2;
input smoothingType = 1;

input length = 50;
input displace = 0;
def Trnd =  Average(close[-displace], length);

def c1 = priceC - Lowest(priceL, KPeriod);
def c2 = Highest(priceH, KPeriod) - Lowest(priceL, KPeriod);
def FastK = c1 / c2 * 100;

plot FullK;
#plot FullD;

if smoothingType == 1
then {
    FullK = Average(FastK, slowing_period);
    #FullD = Average(FullK, DPeriod);
} else {
    FullK = ExpAverage(FastK, slowing_period);
    #FullD = ExpAverage(FullK, DPeriod);
}
plot OverBought = over_bought;
plot OverSold = over_sold;
#plot MdLn1 = MidLine1;
#plot MdLn2 = MidLine2;

#FullD.AssignValueColor(if FullD > FullD[1] then Color.White else (if FullD == FullD[1] then Color.White else Color.Magenta));
#FullD.SetLineWeight(1);

FullK.AssignValueColor(if FullK > FullK[1] then color.green else color.red);
FullK.SetLineWeight(2);


#MdLn1.SetDefaultColor(GetColor(3));
#MdLn2.SetDefaultColor(GetColor(3));
OverBought.SetDefaultColor(GetColor(1));
OverSold.SetDefaultColor(GetColor(1));
