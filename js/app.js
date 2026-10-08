/* Bullsy game logic, charts, voice news, quit-to-advisor flow and the end-of-game AI Advisor. Loads after data.js. */
const ROUNDS = 8, SNAPSHOT = "5 Oct 2026";
const RISK = {1:'low', 2:'medium', 3:'high'};
const PROFILE = { 1:{mu:.075,vol:.10,beta:.6}, 2:{mu:.11,vol:.20,beta:1}, 3:{mu:.15,vol:.36,beta:1.4} };
const SECTORS = ['Banking', 'IT', 'Automobiles', 'Pharma', 'Energy'];
const SECCOL = { Banking: '#5E86B8', IT: '#4E9AA3', Automobiles: '#B08A52', Pharma: '#8E7DB8', Energy: '#C4805E' };
/* Official logo per symbol: a data: URI or a file published beside this page (for example "logos/ICICIBANK.png"). Empty means the initials badge is shown. */
/* The team's own Bullsy logo: the bull mark for small spots, the full lockup for the first page. */
const ASSETS = [{"id":"icicibank","sym":"ICICIBANK","name":"ICICI Bank","kind":"stock","sector":"Banking","desc":"Big private bank with a strong retail loan book.","price":1333.2,"vol19":1.08,"days":[{"d":"7 Sep","o":1428,"h":1434.4,"l":1422.6,"c":1427.5,"chg":0.3,"v":8040000},{"d":"8 Sep","o":1424,"h":1424.9,"l":1396.3,"c":1399.4,"chg":-1.97,"v":12120000},{"d":"9 Sep","o":1395.9,"h":1402.5,"l":1385.5,"c":1389.1,"chg":-0.74,"v":14230000},{"d":"10 Sep","o":1385.9,"h":1393,"l":1373.9,"c":1384.5,"chg":-0.33,"v":10580000},{"d":"11 Sep","o":1371.6,"h":1389,"l":1367.6,"c":1379.3,"chg":-0.38,"v":7060000},{"d":"15 Sep","o":1379.3,"h":1390,"l":1350.4,"c":1350.4,"chg":-2.1,"v":10130000},{"d":"16 Sep","o":1359,"h":1361.4,"l":1348,"c":1358.8,"chg":0.62,"v":9630000},{"d":"17 Sep","o":1352,"h":1363,"l":1347.6,"c":1347.6,"chg":-0.82,"v":7870000},{"d":"18 Sep","o":1351.9,"h":1359.8,"l":1338.9,"c":1338.9,"chg":-0.65,"v":7510000},{"d":"21 Sep","o":1347.8,"h":1352,"l":1340.4,"c":1345,"chg":0.46,"v":5710000},{"d":"22 Sep","o":1343,"h":1347.2,"l":1333.8,"c":1339.6,"chg":-0.4,"v":6430000},{"d":"23 Sep","o":1339.9,"h":1344.5,"l":1333.5,"c":1340,"chg":0.03,"v":4760000},{"d":"24 Sep","o":1333.1,"h":1347.8,"l":1330.1,"c":1334.5,"chg":-0.41,"v":8650000},{"d":"25 Sep","o":1332.9,"h":1340.8,"l":1312,"c":1326.8,"chg":-0.58,"v":10840000},{"d":"28 Sep","o":1321.1,"h":1323.8,"l":1300,"c":1302,"chg":-1.87,"v":6330000},{"d":"29 Sep","o":1295.7,"h":1304.8,"l":1291,"c":1292.2,"chg":-0.75,"v":14810000},{"d":"30 Sep","o":1295.3,"h":1337,"l":1295.3,"c":1321.7,"chg":2.28,"v":14100000},{"d":"1 Oct","o":1316,"h":1329.9,"l":1308.4,"c":1310.6,"chg":-0.84,"v":13160000},{"d":"5 Oct","o":1311,"h":1333.7,"l":1304.3,"c":1333.2,"chg":1.72,"v":13220000}],"hist":[1427.5,1399.4,1389.1,1384.5,1379.3,1350.4,1358.8,1347.6,1338.9,1345,1339.6,1340,1334.5,1326.8,1302,1292.2,1321.7,1310.6,1333.2],"risk":1},
 {"id":"sbin","sym":"SBIN","name":"State Bank of India","kind":"stock","sector":"Banking","desc":"India's largest bank, owned mostly by the government.","price":958.3,"vol19":1.18,"days":[{"d":"7 Sep","o":1020.8,"h":1021.7,"l":1000.6,"c":1005.9,"chg":-1,"v":10220000},{"d":"8 Sep","o":1004.9,"h":1011.2,"l":1002.1,"c":1008,"chg":0.21,"v":7080000},{"d":"9 Sep","o":999,"h":1012.2,"l":992.4,"c":1000.5,"chg":-0.74,"v":7090000},{"d":"10 Sep","o":1002,"h":1011.9,"l":1001,"c":1009.7,"chg":0.92,"v":5500000},{"d":"11 Sep","o":1000,"h":1001.9,"l":993,"c":995.7,"chg":-1.39,"v":7770000},{"d":"15 Sep","o":994,"h":999.8,"l":968,"c":968,"chg":-2.78,"v":10000000},{"d":"16 Sep","o":976,"h":991.4,"l":973.2,"c":991.4,"chg":2.42,"v":8610000},{"d":"17 Sep","o":991.2,"h":1000.9,"l":985.2,"c":988.7,"chg":-0.27,"v":8620000},{"d":"18 Sep","o":992,"h":996.2,"l":985.1,"c":996.2,"chg":0.76,"v":5700000},{"d":"21 Sep","o":993.6,"h":997.5,"l":989.1,"c":996,"chg":-0.02,"v":3590000},{"d":"22 Sep","o":999.1,"h":1000.1,"l":981.3,"c":987,"chg":-0.9,"v":6130000},{"d":"23 Sep","o":987,"h":996.4,"l":986.4,"c":994.1,"chg":0.72,"v":4520000},{"d":"24 Sep","o":982.3,"h":992,"l":975.8,"c":978.5,"chg":-1.57,"v":13720000},{"d":"25 Sep","o":980.8,"h":985.7,"l":977,"c":983,"chg":0.46,"v":3760000},{"d":"28 Sep","o":980.1,"h":982.5,"l":956.1,"c":962,"chg":-2.14,"v":9850000},{"d":"29 Sep","o":960.9,"h":968.1,"l":953,"c":964.7,"chg":0.28,"v":26780000},{"d":"30 Sep","o":964.7,"h":972.8,"l":959.5,"c":959.5,"chg":-0.54,"v":8010000},{"d":"1 Oct","o":953.1,"h":965.4,"l":945.8,"c":954.1,"chg":-0.56,"v":7390000},{"d":"5 Oct","o":959,"h":969.45,"l":956.35,"c":958.3,"chg":0.44,"v":8160000}],"hist":[1005.9,1008,1000.5,1009.7,995.7,968,991.4,988.7,996.2,996,987,994.1,978.5,983,962,964.7,959.5,954.1,958.3],"risk":2},
 {"id":"hdfcbank","sym":"HDFCBANK","name":"HDFC Bank","kind":"stock","sector":"Banking","desc":"India's largest private bank.","price":704.55,"vol19":1.49,"days":[{"d":"7 Sep","o":712.1,"h":713,"l":707.05,"c":710.5,"chg":-0.22,"v":12180000},{"d":"8 Sep","o":707.1,"h":708.9,"l":703,"c":703,"chg":-1.06,"v":19880000},{"d":"9 Sep","o":698,"h":700,"l":687.1,"c":687.1,"chg":-2.26,"v":39170000},{"d":"10 Sep","o":687.1,"h":694.5,"l":686.2,"c":693.8,"chg":0.98,"v":27110000},{"d":"11 Sep","o":683.9,"h":709,"l":681.9,"c":708.25,"chg":2.08,"v":31410000},{"d":"15 Sep","o":722.4,"h":730.75,"l":715.05,"c":716.55,"chg":1.17,"v":50390000},{"d":"16 Sep","o":714.9,"h":725.4,"l":710.85,"c":721.5,"chg":0.69,"v":27480000},{"d":"17 Sep","o":717.5,"h":719.4,"l":713,"c":713,"chg":-1.18,"v":21540000},{"d":"18 Sep","o":715.25,"h":733.8,"l":715.25,"c":731,"chg":2.52,"v":39400000},{"d":"21 Sep","o":731,"h":742.65,"l":729.05,"c":739.5,"chg":1.16,"v":35480000},{"d":"22 Sep","o":738.85,"h":749.3,"l":738.6,"c":738.6,"chg":-0.12,"v":35480000},{"d":"23 Sep","o":735.65,"h":742.8,"l":734,"c":737.25,"chg":-0.18,"v":23200000},{"d":"24 Sep","o":725,"h":734.85,"l":722.7,"c":728.9,"chg":-1.13,"v":29580000},{"d":"25 Sep","o":723,"h":739.65,"l":723,"c":735.6,"chg":0.92,"v":19850000},{"d":"28 Sep","o":731.6,"h":733,"l":718.1,"c":719.05,"chg":-2.25,"v":21680000},{"d":"29 Sep","o":713.7,"h":722.7,"l":706.25,"c":722.7,"chg":0.51,"v":42760000},{"d":"30 Sep","o":711.5,"h":720.3,"l":708.7,"c":708.7,"chg":-1.94,"v":39370000},{"d":"1 Oct","o":708.4,"h":721.3,"l":707.1,"c":721.2,"chg":1.76,"v":37390000},{"d":"5 Oct","o":731.95,"h":733.95,"l":701.3,"c":704.55,"chg":-2.31,"v":66040000}],"hist":[710.5,703,687.1,693.8,708.25,716.55,721.5,713,731,739.5,738.6,737.25,728.9,735.6,719.05,722.7,708.7,721.2,704.55],"risk":3},
 {"id":"wipro","sym":"WIPRO","name":"Wipro","kind":"stock","sector":"IT","desc":"IT services firm, smaller than TCS and Infosys.","price":162.31,"vol19":1.34,"days":[{"d":"7 Sep","o":175.89,"h":176.47,"l":172.65,"c":172.8,"chg":-2.04,"v":10720000},{"d":"8 Sep","o":172.8,"h":172.9,"l":171.13,"c":171.5,"chg":-0.75,"v":6950000},{"d":"9 Sep","o":168.7,"h":169.15,"l":166.37,"c":167,"chg":-2.62,"v":12000000},{"d":"10 Sep","o":167.9,"h":169.19,"l":166,"c":166.3,"chg":-0.42,"v":9590000},{"d":"11 Sep","o":165.2,"h":167.75,"l":165.16,"c":167.4,"chg":0.66,"v":8480000},{"d":"15 Sep","o":172.2,"h":173.35,"l":169.01,"c":170,"chg":1.55,"v":11720000},{"d":"16 Sep","o":170.02,"h":170.89,"l":166.11,"c":166.89,"chg":-1.83,"v":11030000},{"d":"17 Sep","o":165.75,"h":167.6,"l":165.02,"c":166.4,"chg":-0.29,"v":9130000},{"d":"18 Sep","o":166.9,"h":166.9,"l":163.3,"c":166.83,"chg":0.26,"v":23610000},{"d":"21 Sep","o":165.24,"h":165.5,"l":163.34,"c":164.55,"chg":-1.37,"v":9280000},{"d":"22 Sep","o":164.81,"h":166,"l":163.21,"c":166,"chg":0.88,"v":14730000},{"d":"23 Sep","o":164.7,"h":165.7,"l":164.1,"c":164.9,"chg":-0.66,"v":10860000},{"d":"24 Sep","o":164.16,"h":165.67,"l":163.36,"c":163.64,"chg":-0.76,"v":7030000},{"d":"25 Sep","o":163.05,"h":164.5,"l":161.66,"c":164.02,"chg":0.23,"v":9700000},{"d":"28 Sep","o":164.02,"h":164.45,"l":160.97,"c":161.56,"chg":-1.5,"v":10310000},{"d":"29 Sep","o":161,"h":162.43,"l":156.79,"c":156.79,"chg":-2.95,"v":164450000},{"d":"30 Sep","o":157.01,"h":161.73,"l":157.01,"c":158.5,"chg":1.09,"v":15970000},{"d":"1 Oct","o":158.61,"h":160.95,"l":157.25,"c":159.35,"chg":0.54,"v":18520000},{"d":"5 Oct","o":163,"h":164.29,"l":161.51,"c":162.31,"chg":1.86,"v":30830000}],"hist":[172.8,171.5,167,166.3,167.4,170,166.89,166.4,166.83,164.55,166,164.9,163.64,164.02,161.56,156.79,158.5,159.35,162.31],"risk":1},
 {"id":"tcs","sym":"TCS","name":"Tata Consultancy Services","kind":"stock","sector":"IT","desc":"India's largest IT services company.","price":2105,"vol19":1.49,"days":[{"d":"7 Sep","o":2290.1,"h":2299.9,"l":2260.1,"c":2270,"chg":-1.48,"v":2300000},{"d":"8 Sep","o":2270,"h":2274.5,"l":2244,"c":2255.5,"chg":-0.64,"v":2150000},{"d":"9 Sep","o":2237,"h":2237,"l":2193.2,"c":2208,"chg":-2.11,"v":3370000},{"d":"10 Sep","o":2199,"h":2232,"l":2190.6,"c":2204.1,"chg":-0.18,"v":2490000},{"d":"11 Sep","o":2185.5,"h":2232.6,"l":2185.5,"c":2200.8,"chg":-0.15,"v":2630000},{"d":"15 Sep","o":2275.5,"h":2323,"l":2251,"c":2251,"chg":2.28,"v":5410000},{"d":"16 Sep","o":2270,"h":2273.9,"l":2172,"c":2188.8,"chg":-2.76,"v":2760000},{"d":"17 Sep","o":2171,"h":2263.6,"l":2162.5,"c":2190,"chg":0.05,"v":3300000},{"d":"18 Sep","o":2177.2,"h":2177.3,"l":2101.2,"c":2105,"chg":-3.88,"v":6880000},{"d":"21 Sep","o":2090,"h":2145,"l":2075.3,"c":2128.7,"chg":1.13,"v":2330000},{"d":"22 Sep","o":2135.1,"h":2135.2,"l":2098.2,"c":2105,"chg":-1.11,"v":3640000},{"d":"23 Sep","o":2099,"h":2104.2,"l":2077.6,"c":2089.6,"chg":-0.73,"v":2230000},{"d":"24 Sep","o":2076,"h":2096.9,"l":2067.1,"c":2087,"chg":-0.12,"v":1760000},{"d":"25 Sep","o":2054,"h":2090.2,"l":2038.1,"c":2082,"chg":-0.24,"v":3340000},{"d":"28 Sep","o":2100,"h":2100,"l":2051,"c":2070.7,"chg":-0.54,"v":2460000},{"d":"29 Sep","o":2065,"h":2085.1,"l":2032.4,"c":2032.4,"chg":-1.85,"v":4440000},{"d":"30 Sep","o":2069,"h":2101,"l":2050.6,"c":2050.6,"chg":0.9,"v":3660000},{"d":"1 Oct","o":2052.6,"h":2093.9,"l":2045.1,"c":2075,"chg":1.19,"v":3430000},{"d":"5 Oct","o":2114,"h":2140.5,"l":2066.5,"c":2105,"chg":1.45,"v":5270000}],"hist":[2270,2255.5,2208,2204.1,2200.8,2251,2188.8,2190,2105,2128.7,2105,2089.6,2087,2082,2070.7,2032.4,2050.6,2075,2105],"risk":2},
 {"id":"infy","sym":"INFY","name":"Infosys","kind":"stock","sector":"IT","desc":"IT services exporter. Earns mostly in dollars.","price":1019,"vol19":2,"days":[{"d":"7 Sep","o":1109.5,"h":1109.9,"l":1085,"c":1087.5,"chg":-3.76,"v":7670000},{"d":"8 Sep","o":1095,"h":1095,"l":1078.9,"c":1082,"chg":-0.51,"v":6270000},{"d":"9 Sep","o":1059,"h":1059,"l":1026.5,"c":1035,"chg":-4.34,"v":13530000},{"d":"10 Sep","o":1039.6,"h":1046.6,"l":1027.3,"c":1036.5,"chg":0.14,"v":9000000},{"d":"11 Sep","o":1032,"h":1047.3,"l":1029.7,"c":1037.7,"chg":0.12,"v":6170000},{"d":"15 Sep","o":1085,"h":1097.7,"l":1071.7,"c":1077,"chg":3.79,"v":14820000},{"d":"16 Sep","o":1082.5,"h":1085.1,"l":1053.5,"c":1060,"chg":-1.58,"v":6230000},{"d":"17 Sep","o":1054.9,"h":1063.6,"l":1048.6,"c":1058.6,"chg":-0.13,"v":5470000},{"d":"18 Sep","o":1061.9,"h":1061.9,"l":1038,"c":1051.4,"chg":-0.68,"v":22120000},{"d":"21 Sep","o":1041.5,"h":1044.5,"l":1030.3,"c":1038.5,"chg":-1.23,"v":6070000},{"d":"22 Sep","o":1037.7,"h":1041,"l":1019.2,"c":1029.4,"chg":-0.88,"v":9340000},{"d":"23 Sep","o":1021.8,"h":1029.4,"l":1015.1,"c":1020.5,"chg":-0.86,"v":5110000},{"d":"24 Sep","o":1015,"h":1022.8,"l":1005.2,"c":1014.5,"chg":-0.59,"v":6890000},{"d":"25 Sep","o":999.5,"h":1004.2,"l":991.6,"c":1000.2,"chg":-1.41,"v":10240000},{"d":"28 Sep","o":1002,"h":1009.5,"l":986.6,"c":1003.2,"chg":0.3,"v":8570000},{"d":"29 Sep","o":1002.6,"h":1015.4,"l":980.4,"c":1015.4,"chg":1.22,"v":12990000},{"d":"30 Sep","o":1004,"h":1024,"l":992.2,"c":994.1,"chg":-2.1,"v":13510000},{"d":"1 Oct","o":1010,"h":1035,"l":999.15,"c":1035,"chg":4.11,"v":15170000},{"d":"5 Oct","o":1050,"h":1050,"l":1010.1,"c":1019,"chg":-1.55,"v":12130000}],"hist":[1087.5,1082,1035,1036.5,1037.7,1077,1060,1058.6,1051.4,1038.5,1029.4,1020.5,1014.5,1000.2,1003.2,1015.4,994.1,1035,1019],"risk":3},
 {"id":"mm","sym":"M&M","name":"Mahindra & Mahindra","kind":"stock","sector":"Automobiles","desc":"Makes SUVs and tractors. Rural demand matters a lot.","price":2853.3,"vol19":1.12,"days":[{"d":"7 Sep","o":3154.1,"h":3178,"l":3145,"c":3160,"chg":-0.32,"v":1720000},{"d":"8 Sep","o":3145,"h":3163,"l":3096.3,"c":3160,"chg":0,"v":1780000},{"d":"9 Sep","o":3135.3,"h":3151.3,"l":3118,"c":3150,"chg":-0.32,"v":1050000},{"d":"10 Sep","o":3141.7,"h":3146.9,"l":3097.7,"c":3123.8,"chg":-0.83,"v":2140000},{"d":"11 Sep","o":3110,"h":3124.2,"l":3069.1,"c":3107,"chg":-0.54,"v":1310000},{"d":"15 Sep","o":3114.6,"h":3119.6,"l":3029.5,"c":3029.5,"chg":-2.49,"v":2180000},{"d":"16 Sep","o":3044.6,"h":3105.9,"l":3044.6,"c":3070,"chg":1.34,"v":2390000},{"d":"17 Sep","o":3047,"h":3127.8,"l":3047,"c":3076.5,"chg":0.21,"v":1880000},{"d":"18 Sep","o":3082,"h":3098.2,"l":3052,"c":3052,"chg":-0.8,"v":2970000},{"d":"21 Sep","o":3065,"h":3088,"l":3055.3,"c":3055.3,"chg":0.11,"v":1060000},{"d":"22 Sep","o":3066,"h":3093.7,"l":3035,"c":3044.5,"chg":-0.35,"v":1710000},{"d":"23 Sep","o":3048.4,"h":3052,"l":3022.4,"c":3035,"chg":-0.31,"v":2600000},{"d":"24 Sep","o":3028.8,"h":3039,"l":2982.7,"c":2982.7,"chg":-1.72,"v":1900000},{"d":"25 Sep","o":2965,"h":3045,"l":2965,"c":3035,"chg":1.75,"v":2080000},{"d":"28 Sep","o":3017.3,"h":3019.9,"l":2977.6,"c":2995,"chg":-1.32,"v":2080000},{"d":"29 Sep","o":2986,"h":2991,"l":2947.8,"c":2947.8,"chg":-1.58,"v":3270000},{"d":"30 Sep","o":2925,"h":2986,"l":2925,"c":2950,"chg":0.07,"v":2330000},{"d":"1 Oct","o":2926,"h":2927.4,"l":2812,"c":2860,"chg":-3.05,"v":5450000},{"d":"5 Oct","o":2857.5,"h":2874,"l":2825.9,"c":2853.3,"chg":-0.23,"v":3310000}],"hist":[3160,3160,3150,3123.8,3107,3029.5,3070,3076.5,3052,3055.3,3044.5,3035,2982.7,3035,2995,2947.8,2950,2860,2853.3],"risk":1},
 {"id":"maruti","sym":"MARUTI","name":"Maruti Suzuki","kind":"stock","sector":"Automobiles","desc":"India's biggest car maker.","price":11513,"vol19":1.41,"days":[{"d":"7 Sep","o":12691,"h":12833,"l":12618,"c":12760,"chg":0.52,"v":413780},{"d":"8 Sep","o":12758,"h":12758,"l":12582,"c":12641,"chg":-0.93,"v":356860},{"d":"9 Sep","o":12609,"h":12692,"l":12537,"c":12618,"chg":-0.18,"v":534830},{"d":"10 Sep","o":12679,"h":12693,"l":12517,"c":12590,"chg":-0.22,"v":338610},{"d":"11 Sep","o":12520,"h":12541,"l":12381,"c":12400,"chg":-1.51,"v":514870},{"d":"15 Sep","o":12470,"h":12470,"l":12231,"c":12231,"chg":-1.36,"v":286170},{"d":"16 Sep","o":12231,"h":12367,"l":12159,"c":12166,"chg":-0.53,"v":312880},{"d":"17 Sep","o":12165,"h":12409,"l":12127,"c":12338,"chg":1.41,"v":249060},{"d":"18 Sep","o":12350,"h":12458,"l":12103,"c":12103,"chg":-1.9,"v":659770},{"d":"21 Sep","o":12129,"h":12229,"l":12129,"c":12153,"chg":0.41,"v":339170},{"d":"22 Sep","o":12155,"h":12275,"l":12142,"c":12190,"chg":0.3,"v":246720},{"d":"23 Sep","o":12240,"h":12255,"l":12106,"c":12230,"chg":0.33,"v":220480},{"d":"24 Sep","o":12180,"h":12184,"l":11975,"c":11990,"chg":-1.96,"v":393670},{"d":"25 Sep","o":11997,"h":12098,"l":11975,"c":12065,"chg":0.63,"v":283640},{"d":"28 Sep","o":12065,"h":12116,"l":11944,"c":12008,"chg":-0.47,"v":301830},{"d":"29 Sep","o":12046,"h":12046,"l":11831,"c":11877,"chg":-1.09,"v":519770},{"d":"30 Sep","o":11901,"h":12065,"l":11879,"c":11967,"chg":0.76,"v":430290},{"d":"1 Oct","o":11900,"h":11907,"l":11305,"c":11386,"chg":-4.86,"v":885820},{"d":"5 Oct","o":11386,"h":11542,"l":11309,"c":11513,"chg":1.12,"v":757170}],"hist":[12760,12641,12618,12590,12400,12231,12166,12338,12103,12153,12190,12230,11990,12065,12008,11877,11967,11386,11513],"risk":2},
 {"id":"tatamotors","sym":"TATAMOTORS","name":"Tata Motors","kind":"stock","sector":"Automobiles","desc":"Cars, trucks and electric vehicles.","price":426.1,"vol19":1.67,"days":[{"d":"7 Sep","o":459,"h":461.9,"l":454.15,"c":459.65,"chg":0.32,"v":4400000},{"d":"8 Sep","o":459,"h":460.45,"l":453.25,"c":456.05,"chg":-0.78,"v":4620000},{"d":"9 Sep","o":455.05,"h":458.35,"l":443.55,"c":444.95,"chg":-2.43,"v":5680000},{"d":"10 Sep","o":444,"h":445.2,"l":437.5,"c":439.25,"chg":-1.28,"v":4480000},{"d":"11 Sep","o":436,"h":436.95,"l":425.35,"c":434.55,"chg":-1.07,"v":7110000},{"d":"15 Sep","o":441.2,"h":446.7,"l":424.05,"c":427.15,"chg":-1.7,"v":4290000},{"d":"16 Sep","o":425.1,"h":426.4,"l":416,"c":424.25,"chg":-0.68,"v":5090000},{"d":"17 Sep","o":424.25,"h":437.35,"l":421.8,"c":436.1,"chg":2.79,"v":4780000},{"d":"18 Sep","o":436,"h":445,"l":430.2,"c":442.9,"chg":1.56,"v":13130000},{"d":"21 Sep","o":440.1,"h":445.45,"l":437.2,"c":444.5,"chg":0.36,"v":4680000},{"d":"22 Sep","o":444.5,"h":452,"l":437.2,"c":440.1,"chg":-0.99,"v":4760000},{"d":"23 Sep","o":442.7,"h":452,"l":438.5,"c":450.2,"chg":2.29,"v":11530000},{"d":"24 Sep","o":447.35,"h":456.05,"l":431.55,"c":437.15,"chg":-2.9,"v":4810000},{"d":"25 Sep","o":440,"h":445,"l":436.6,"c":441.5,"chg":1,"v":6270000},{"d":"28 Sep","o":441.5,"h":441.5,"l":430.2,"c":432.95,"chg":-1.94,"v":4530000},{"d":"29 Sep","o":430.6,"h":434.8,"l":426.5,"c":430.15,"chg":-0.65,"v":4990000},{"d":"30 Sep","o":430.15,"h":438.15,"l":418.7,"c":421.65,"chg":-1.98,"v":10920000},{"d":"1 Oct","o":416.25,"h":420,"l":404.1,"c":415.5,"chg":-1.46,"v":7410000},{"d":"5 Oct","o":415.5,"h":428.8,"l":413,"c":426.1,"chg":2.55,"v":8040000}],"hist":[459.65,456.05,444.95,439.25,434.55,427.15,424.25,436.1,442.9,444.5,440.1,450.2,437.15,441.5,432.95,430.15,421.65,415.5,426.1],"risk":3},
 {"id":"cipla","sym":"CIPLA","name":"Cipla","kind":"stock","sector":"Pharma","desc":"Medicine maker known for respiratory drugs.","price":1331.3,"vol19":0.98,"days":[{"d":"7 Sep","o":1380,"h":1395.7,"l":1376.8,"c":1395,"chg":0.72,"v":606500},{"d":"8 Sep","o":1393.4,"h":1398.4,"l":1377.2,"c":1384,"chg":-0.79,"v":728800},{"d":"9 Sep","o":1380,"h":1388.7,"l":1363.1,"c":1363.1,"chg":-1.51,"v":818770},{"d":"10 Sep","o":1366.8,"h":1380,"l":1363.1,"c":1373.3,"chg":0.75,"v":826220},{"d":"11 Sep","o":1373,"h":1373,"l":1347.7,"c":1366,"chg":-0.53,"v":1680000},{"d":"15 Sep","o":1355,"h":1362.7,"l":1347.7,"c":1351,"chg":-1.1,"v":1230000},{"d":"16 Sep","o":1351,"h":1363.7,"l":1344.3,"c":1358,"chg":0.52,"v":911570},{"d":"17 Sep","o":1362.5,"h":1385,"l":1351.6,"c":1376.3,"chg":1.35,"v":730650},{"d":"18 Sep","o":1371.7,"h":1394.5,"l":1371.7,"c":1394.5,"chg":1.32,"v":1390000},{"d":"21 Sep","o":1383.2,"h":1405.2,"l":1378.3,"c":1386.1,"chg":-0.6,"v":895130},{"d":"22 Sep","o":1386.3,"h":1388.7,"l":1364.5,"c":1384.1,"chg":-0.14,"v":767140},{"d":"23 Sep","o":1382.4,"h":1387,"l":1371.8,"c":1383,"chg":-0.08,"v":651220},{"d":"24 Sep","o":1375,"h":1419,"l":1364.6,"c":1399,"chg":1.16,"v":1580000},{"d":"25 Sep","o":1402.9,"h":1421,"l":1388.4,"c":1399.7,"chg":0.05,"v":1170000},{"d":"28 Sep","o":1399.7,"h":1405,"l":1380.5,"c":1383.7,"chg":-1.14,"v":711020},{"d":"29 Sep","o":1390,"h":1401.8,"l":1376.2,"c":1379.3,"chg":-0.32,"v":1480000},{"d":"30 Sep","o":1383,"h":1384,"l":1346,"c":1346,"chg":-2.41,"v":1060000},{"d":"1 Oct","o":1349.1,"h":1359.4,"l":1333.4,"c":1344,"chg":-0.15,"v":921790},{"d":"5 Oct","o":1334.3,"h":1337.7,"l":1321.2,"c":1331.3,"chg":-0.94,"v":1080000}],"hist":[1395,1384,1363.1,1373.3,1366,1351,1358,1376.3,1394.5,1386.1,1384.1,1383,1399,1399.7,1383.7,1379.3,1346,1344,1331.3],"risk":1},
 {"id":"sunpharma","sym":"SUNPHARMA","name":"Sun Pharma","kind":"stock","sector":"Pharma","desc":"India's largest medicine maker.","price":1777.6,"vol19":1.1,"days":[{"d":"7 Sep","o":1899,"h":1907.8,"l":1883.1,"c":1895,"chg":-0.21,"v":1580000},{"d":"8 Sep","o":1892,"h":1895.6,"l":1876.8,"c":1885.9,"chg":-0.48,"v":1420000},{"d":"9 Sep","o":1892.6,"h":1898.6,"l":1864.9,"c":1864.9,"chg":-1.11,"v":1400000},{"d":"10 Sep","o":1865.9,"h":1875.3,"l":1840.5,"c":1861,"chg":-0.21,"v":1180000},{"d":"11 Sep","o":1845,"h":1854.5,"l":1834,"c":1840,"chg":-1.13,"v":1450000},{"d":"15 Sep","o":1854.6,"h":1856.8,"l":1828,"c":1835,"chg":-0.27,"v":1440000},{"d":"16 Sep","o":1843.6,"h":1857.4,"l":1837,"c":1853.5,"chg":1.01,"v":1370000},{"d":"17 Sep","o":1853.5,"h":1867.3,"l":1847.4,"c":1867.3,"chg":0.74,"v":1380000},{"d":"18 Sep","o":1866.1,"h":1877.2,"l":1837.3,"c":1837.3,"chg":-1.61,"v":2900000},{"d":"21 Sep","o":1832.2,"h":1891.5,"l":1832.2,"c":1868.9,"chg":1.72,"v":2530000},{"d":"22 Sep","o":1869,"h":1876.4,"l":1842.3,"c":1846.4,"chg":-1.2,"v":1060000},{"d":"23 Sep","o":1846.4,"h":1869.6,"l":1844,"c":1865,"chg":1.01,"v":902510},{"d":"24 Sep","o":1859,"h":1880,"l":1848.4,"c":1849.9,"chg":-0.81,"v":1740000},{"d":"25 Sep","o":1858.7,"h":1858.7,"l":1841.6,"c":1852.2,"chg":0.12,"v":683250},{"d":"28 Sep","o":1844,"h":1856.6,"l":1838,"c":1838,"chg":-0.77,"v":947720},{"d":"29 Sep","o":1853.9,"h":1865,"l":1836.6,"c":1865,"chg":1.47,"v":3080000},{"d":"30 Sep","o":1861.3,"h":1863.6,"l":1814.2,"c":1816.6,"chg":-2.6,"v":2400000},{"d":"1 Oct","o":1815,"h":1828.7,"l":1792.6,"c":1801,"chg":-0.86,"v":2310000},{"d":"5 Oct","o":1785,"h":1802.9,"l":1776.8,"c":1777.6,"chg":-1.3,"v":1290000}],"hist":[1895,1885.9,1864.9,1861,1840,1835,1853.5,1867.3,1837.3,1868.9,1846.4,1865,1849.9,1852.2,1838,1865,1816.6,1801,1777.6],"risk":2},
 {"id":"drreddy","sym":"DRREDDY","name":"Dr Reddy's Laboratories","kind":"stock","sector":"Pharma","desc":"Generic drug maker with big US sales.","price":1204.8,"vol19":1.39,"days":[{"d":"7 Sep","o":1150.5,"h":1163.2,"l":1141.8,"c":1144.2,"chg":-0.59,"v":420950},{"d":"8 Sep","o":1146.5,"h":1154.5,"l":1144,"c":1151,"chg":0.59,"v":587270},{"d":"9 Sep","o":1146,"h":1151,"l":1136.4,"c":1145,"chg":-0.52,"v":528500},{"d":"10 Sep","o":1140,"h":1147.2,"l":1134.9,"c":1143,"chg":-0.17,"v":1680000},{"d":"11 Sep","o":1130,"h":1182,"l":1130,"c":1165.5,"chg":1.97,"v":2400000},{"d":"15 Sep","o":1163.7,"h":1168.5,"l":1141,"c":1145,"chg":-1.76,"v":1810000},{"d":"16 Sep","o":1142,"h":1149.9,"l":1133.9,"c":1140,"chg":-0.44,"v":1120000},{"d":"17 Sep","o":1140,"h":1189.8,"l":1140,"c":1175,"chg":3.07,"v":2310000},{"d":"18 Sep","o":1182.6,"h":1207.5,"l":1182.1,"c":1185,"chg":0.85,"v":3000000},{"d":"21 Sep","o":1185,"h":1211.9,"l":1185,"c":1198.3,"chg":1.12,"v":1720000},{"d":"22 Sep","o":1207,"h":1222,"l":1201.2,"c":1211,"chg":1.06,"v":3360000},{"d":"23 Sep","o":1210,"h":1220.5,"l":1205.9,"c":1211.2,"chg":0.02,"v":987420},{"d":"24 Sep","o":1210.9,"h":1213.9,"l":1197,"c":1200.4,"chg":-0.89,"v":1670000},{"d":"25 Sep","o":1204.5,"h":1207.8,"l":1193.4,"c":1201,"chg":0.05,"v":1000000},{"d":"28 Sep","o":1211.6,"h":1229.8,"l":1204,"c":1221,"chg":1.67,"v":3400000},{"d":"29 Sep","o":1243.2,"h":1252.8,"l":1229,"c":1251.9,"chg":2.53,"v":5350000},{"d":"30 Sep","o":1242.2,"h":1244.6,"l":1214.2,"c":1233,"chg":-1.51,"v":4030000},{"d":"1 Oct","o":1233,"h":1233.9,"l":1194.9,"c":1206.2,"chg":-2.17,"v":2610000},{"d":"5 Oct","o":1198,"h":1206.6,"l":1189.9,"c":1204.8,"chg":-0.12,"v":3080000}],"hist":[1144.2,1151,1145,1143,1165.5,1145,1140,1175,1185,1198.3,1211,1211.2,1200.4,1201,1221,1251.9,1233,1206.2,1204.8],"risk":3},
 {"id":"reliance","sym":"RELIANCE","name":"Reliance Industries","kind":"stock","sector":"Energy","desc":"Oil refining, telecom (Jio) and retail under one roof.","price":1188.8,"vol19":1.2,"days":[{"d":"7 Sep","o":1323.1,"h":1324.2,"l":1301.9,"c":1309.5,"chg":-0.95,"v":10210000},{"d":"8 Sep","o":1304.1,"h":1306.8,"l":1288,"c":1294.9,"chg":-1.11,"v":9800000},{"d":"9 Sep","o":1283.5,"h":1294.7,"l":1277.2,"c":1279,"chg":-1.23,"v":12150000},{"d":"10 Sep","o":1278.5,"h":1285.3,"l":1266.3,"c":1274,"chg":-0.39,"v":9300000},{"d":"11 Sep","o":1267,"h":1267.4,"l":1253,"c":1257.5,"chg":-1.3,"v":8780000},{"d":"15 Sep","o":1252.5,"h":1259.4,"l":1235.3,"c":1235.3,"chg":-1.77,"v":13750000},{"d":"16 Sep","o":1243,"h":1255,"l":1240,"c":1240,"chg":0.38,"v":10020000},{"d":"17 Sep","o":1244.8,"h":1253.4,"l":1238.5,"c":1243.9,"chg":0.31,"v":7750000},{"d":"18 Sep","o":1245,"h":1247.3,"l":1226.4,"c":1226.4,"chg":-1.41,"v":15120000},{"d":"21 Sep","o":1234.1,"h":1249.1,"l":1232.5,"c":1247.4,"chg":1.71,"v":10010000},{"d":"22 Sep","o":1247.6,"h":1251.9,"l":1237.4,"c":1240.4,"chg":-0.56,"v":10680000},{"d":"23 Sep","o":1242,"h":1252.8,"l":1238.9,"c":1248,"chg":0.61,"v":8350000},{"d":"24 Sep","o":1236.6,"h":1241.6,"l":1219.2,"c":1219.2,"chg":-2.31,"v":13920000},{"d":"25 Sep","o":1210.5,"h":1227.4,"l":1210.5,"c":1226,"chg":0.56,"v":13140000},{"d":"28 Sep","o":1218,"h":1219.7,"l":1197,"c":1197.6,"chg":-2.32,"v":13600000},{"d":"29 Sep","o":1193.8,"h":1198.3,"l":1181.8,"c":1182,"chg":-1.3,"v":24190000},{"d":"30 Sep","o":1182,"h":1196.5,"l":1181.7,"c":1187,"chg":0.42,"v":16380000},{"d":"1 Oct","o":1180.1,"h":1183.9,"l":1160.8,"c":1167.7,"chg":-1.63,"v":16770000},{"d":"5 Oct","o":1171.2,"h":1192.5,"l":1171.2,"c":1188.8,"chg":1.81,"v":14250000}],"hist":[1309.5,1294.9,1279,1274,1257.5,1235.3,1240,1243.9,1226.4,1247.4,1240.4,1248,1219.2,1226,1197.6,1182,1187,1167.7,1188.8],"risk":1},
 {"id":"ongc","sym":"ONGC","name":"ONGC (Oil & Natural Gas)","kind":"stock","sector":"Energy","desc":"India's biggest oil and gas producer.","price":224.66,"vol19":1.25,"days":[{"d":"7 Sep","o":235.98,"h":235.98,"l":232.77,"c":233.7,"chg":-0.4,"v":5390000},{"d":"8 Sep","o":234.8,"h":238,"l":232.22,"c":236,"chg":0.98,"v":7970000},{"d":"9 Sep","o":237.8,"h":239.27,"l":234.02,"c":234.02,"chg":-0.84,"v":12780000},{"d":"10 Sep","o":236.1,"h":239.8,"l":235.6,"c":237.27,"chg":1.39,"v":12770000},{"d":"11 Sep","o":239.9,"h":243.16,"l":232.5,"c":232.5,"chg":-2.01,"v":27130000},{"d":"15 Sep","o":234.9,"h":236.3,"l":233.33,"c":235.95,"chg":1.48,"v":14550000},{"d":"16 Sep","o":236.45,"h":236.8,"l":233.31,"c":236.8,"chg":0.36,"v":8750000},{"d":"17 Sep","o":235.1,"h":235.65,"l":231.25,"c":232.43,"chg":-1.85,"v":11060000},{"d":"18 Sep","o":232.43,"h":234.32,"l":231.75,"c":232.8,"chg":0.16,"v":11150000},{"d":"21 Sep","o":232.8,"h":236,"l":232.32,"c":235.63,"chg":1.22,"v":6110000},{"d":"22 Sep","o":235.51,"h":236.37,"l":233.75,"c":236.13,"chg":0.21,"v":8100000},{"d":"23 Sep","o":235.5,"h":236.9,"l":234.2,"c":236.9,"chg":0.33,"v":8910000},{"d":"24 Sep","o":235.5,"h":239,"l":235.23,"c":239,"chg":0.89,"v":8490000},{"d":"25 Sep","o":238,"h":238,"l":234.71,"c":235.86,"chg":-1.31,"v":5070000},{"d":"28 Sep","o":235.85,"h":235.85,"l":229.85,"c":230,"chg":-2.48,"v":9820000},{"d":"29 Sep","o":230,"h":231.7,"l":227.8,"c":230,"chg":0,"v":13380000},{"d":"30 Sep","o":230.21,"h":231.57,"l":223.6,"c":225.8,"chg":-1.83,"v":11130000},{"d":"1 Oct","o":224.75,"h":224.99,"l":220.6,"c":222.37,"chg":-1.52,"v":13100000},{"d":"5 Oct","o":222.5,"h":226.56,"l":222.42,"c":224.66,"chg":1.03,"v":19420000}],"hist":[233.7,236,234.02,237.27,232.5,235.95,236.8,232.43,232.8,235.63,236.13,236.9,239,235.86,230,230,225.8,222.37,224.66],"risk":2},
 {"id":"ioc","sym":"IOC","name":"Indian Oil","kind":"stock","sector":"Energy","desc":"Government-owned fuel refiner and retailer.","price":130.8,"vol19":1.45,"days":[{"d":"7 Sep","o":137,"h":137.5,"l":135.15,"c":135.15,"chg":-1.78,"v":5960000},{"d":"8 Sep","o":134.88,"h":135.65,"l":133.02,"c":134.35,"chg":-0.59,"v":6950000},{"d":"9 Sep","o":133.3,"h":136.14,"l":133.06,"c":135.6,"chg":0.93,"v":5300000},{"d":"10 Sep","o":134.31,"h":136.15,"l":134.31,"c":134.94,"chg":-0.49,"v":6630000},{"d":"11 Sep","o":134,"h":136.16,"l":133.25,"c":135.11,"chg":0.13,"v":7200000},{"d":"15 Sep","o":135.5,"h":135.69,"l":132.03,"c":132.03,"chg":-2.28,"v":10870000},{"d":"16 Sep","o":132.79,"h":134.97,"l":131.7,"c":134.75,"chg":2.06,"v":10070000},{"d":"17 Sep","o":134.9,"h":135.33,"l":134,"c":134.27,"chg":-0.36,"v":5640000},{"d":"18 Sep","o":135.02,"h":137,"l":134.6,"c":137,"chg":2.03,"v":11510000},{"d":"21 Sep","o":136.9,"h":137.71,"l":136.34,"c":136.53,"chg":-0.34,"v":8620000},{"d":"22 Sep","o":137.53,"h":139.3,"l":136.8,"c":137.8,"chg":0.93,"v":11160000},{"d":"23 Sep","o":138.5,"h":138.75,"l":137.1,"c":138.15,"chg":0.25,"v":6600000},{"d":"24 Sep","o":136.5,"h":137.5,"l":135.51,"c":136.27,"chg":-1.36,"v":7250000},{"d":"25 Sep","o":136.5,"h":137.06,"l":135.33,"c":135.7,"chg":-0.42,"v":7770000},{"d":"28 Sep","o":135.02,"h":135.58,"l":133.04,"c":133.32,"chg":-1.75,"v":5540000},{"d":"29 Sep","o":133.32,"h":134.31,"l":131.02,"c":131.33,"chg":-1.49,"v":10120000},{"d":"30 Sep","o":133.3,"h":135.99,"l":133.14,"c":134.93,"chg":2.74,"v":9550000},{"d":"1 Oct","o":134,"h":134.1,"l":131.2,"c":131.34,"chg":-2.66,"v":12240000},{"d":"5 Oct","o":132.48,"h":134.29,"l":129.8,"c":130.8,"chg":-0.41,"v":9640000}],"hist":[135.15,134.35,135.6,134.94,135.11,132.03,134.75,134.27,137,136.53,137.8,138.15,136.27,135.7,133.32,131.33,134.93,131.34,130.8],"risk":3}];
/* Real Nifty 50 daily data supplied by the team (close, open, high, low, change %). */
const NIFTY = [{"d":"7 Sep","c":23779.15,"o":23883.15,"h":23890,"l":23737.9,"chg":-0.5},{"d":"8 Sep","c":23635.1,"o":23743.1,"h":23758.95,"l":23623.1,"chg":-0.61},{"d":"9 Sep","c":23431.5,"o":23522.05,"h":23571.55,"l":23431.5,"chg":-0.86},{"d":"10 Sep","c":23477.8,"o":23446.6,"h":23494.95,"l":23380.1,"chg":0.2},{"d":"11 Sep","c":23398.1,"o":23270.3,"h":23448.1,"l":23231.4,"chg":-0.34},{"d":"15 Sep","c":23118.6,"o":23576.15,"h":23592.85,"l":23118.6,"chg":-1.19},{"d":"16 Sep","c":23217.6,"o":23201.6,"h":23284.75,"l":23116.1,"chg":0.43},{"d":"17 Sep","c":23270.6,"o":23195.25,"h":23363.55,"l":23193.65,"chg":0.23},{"d":"18 Sep","c":23346.4,"o":23334.7,"h":23389.15,"l":23286.6,"chg":0.33},{"d":"21 Sep","c":23414.3,"o":23330.2,"h":23466.8,"l":23314.8,"chg":0.29},{"d":"22 Sep","c":23329,"o":23454.05,"h":23489,"l":23285.75,"chg":-0.36},{"d":"23 Sep","c":23446.8,"o":23352.15,"h":23466.9,"l":23349.55,"chg":0.5},{"d":"24 Sep","c":23063.1,"o":23221.8,"h":23281.95,"l":23046.15,"chg":-1.64},{"d":"25 Sep","c":23140.5,"o":23035,"h":23162.7,"l":23020.95,"chg":0.34},{"d":"28 Sep","c":22780.25,"o":23064.9,"h":23080.25,"l":22762.2,"chg":-1.56},{"d":"29 Sep","c":22716.2,"o":22732.45,"h":22753.25,"l":22569.65,"chg":-0.28},{"d":"30 Sep","c":22620.45,"o":22665,"h":22809.35,"l":22595.2,"chg":-0.42},{"d":"1 Oct","c":22421.95,"o":22543.7,"h":22610.6,"l":22217.3,"chg":-0.88},{"d":"5 Oct","c":22555.75,"o":22532.4,"h":22620.3,"l":22397.85,"chg":0.6}];
const EVENTS = [
 {h:'RBI raises interest rates by 0.5%',d:"Mumbai · Monetary policy",b:"The Reserve Bank of India raised its key lending rate by 50 basis points to bring down stubborn inflation. Home, car and business loans are expected to get costlier over the coming weeks, while deposit rates may also edge up.",m:-3,s:{Banking:3,Automobiles:-4},l:'Higher rates make loans costly, so fewer people buy cars. Banks earn more on lending.'},
 {h:'RBI cuts interest rates',d:"Mumbai · Monetary policy",b:"The RBI cut its key lending rate by 25 basis points, saying inflation is back within its comfort zone. Lenders are expected to pass on cheaper EMIs, and economists see a lift to festive-season demand.",m:3,s:{Automobiles:4,Banking:2},l:'Cheaper loans push people to borrow and buy, which lifts most shares.'},
 {h:'IT companies report record deal wins',d:"Bengaluru · Technology",b:"India's top software exporters reported their strongest quarter of new contracts in years, led by cloud and AI projects for US and European clients. Several firms also announced fresh hiring plans.",m:0,s:{IT:10},l:'Good news for one sector lifts that sector. The rest of the market barely notices.'},
 {h:'Crude oil prices spike',d:"Global · Commodities",b:"Crude oil jumped nearly 12% in a week after major producers announced supply cuts. India imports most of the oil it uses, so higher prices raise costs for transporters and airlines and could push up inflation.",m:-3,s:{Energy:7,Automobiles:-5},l:'India imports most of its oil. Costly oil hurts almost everyone except oil producers.'},
 {h:'Crude oil prices crash',d:"Global · Commodities",b:"Crude oil fell nearly 15% in a week as global demand slowed and stockpiles grew. Cheaper oil eases India's import bill and fuel costs, but lowers earnings for oil producers.",m:2,s:{Energy:-7,Automobiles:3},l:'Cheap oil squeezes oil producers and helps the companies and drivers who buy fuel.'},
 {h:'Budget promises record spending on roads and railways',d:"New Delhi · Union Budget",b:"The Finance Minister announced a sharp rise in spending on highways, railways and city transport. Contractors are expected to borrow more, and demand for trucks, buses and construction equipment could pick up.",m:1,s:{Banking:4,Automobiles:4},l:'Government spending means more loans for banks and more trucks and tractors sold.'},
 {h:'Regulator flags quality problems at pharma plants',d:"Global · Healthcare",b:"Inspectors from an overseas drug regulator raised quality concerns after visiting several Indian manufacturing plants. The companies involved may face import alerts that delay or block shipments to key export markets.",m:0,s:{Pharma:-10},l:'One sector can fall alone. Owning several sectors softens this kind of hit.'},
 {h:'US regulator clears a wave of Indian generic drugs',d:"Washington · Healthcare",b:"The US drug regulator approved a large batch of generic medicines made by Indian companies. The approvals open up a big export market, and analysts expect overseas sales to grow over the next few quarters.",m:0,s:{Pharma:9},l:'Indian drug makers earn a large share of their sales in the US, so approvals there matter.'},
 {h:'Weather office forecasts a good monsoon',d:"New Delhi · Weather",b:"The weather office forecast above-normal monsoon rain this year, with good coverage across the main farming states. A strong harvest usually lifts rural incomes and spending on two-wheelers, tractors and household goods.",m:1,s:{Automobiles:6},l:'Good rain means higher farm income, so villages buy more bikes, cars and tractors.'},
 {h:'Foreign investors pour money into Indian markets',d:"Mumbai · Markets",b:"Foreign investors bought Indian shares worth thousands of crores this week, their longest buying streak in months. Fund managers point to India's growth outlook and steady company earnings.",m:7,s:{},l:'When big money flows in, almost everything rises together.'},
 {h:'Viral post claims a market crash is coming next week',d:"Social media · Unverified",b:"A post predicting a market crash next week was shared widely overnight. It cites no source, and regulators remind investors to rely on official company disclosures, not forwarded messages.",m:0,s:{},noise:true,l:'The rumour came to nothing. Most scary headlines are noise, and reacting to each one costs money.'},
 {h:'Rupee weakens against the dollar',d:"Mumbai · Currency",b:"The rupee fell sharply against the US dollar as importers rushed to buy dollars. A weaker rupee makes imports such as crude oil costlier but raises the rupee value of export earnings.",m:-1,s:{IT:5,Pharma:3,Energy:-4},l:'Exporters paid in dollars gain. Companies that import oil lose.'},
 {h:'New subsidy announced for electric vehicles',d:"New Delhi · Policy",b:"The government announced a new incentive scheme for electric two-wheelers, cars and buses, plus support for local battery making. Automakers are expected to speed up their electric vehicle launches.",m:0,s:{Automobiles:8},l:'Policy changes create clear winners in the sectors they target.'},
 {h:'Bad loans rise at several large banks',d:"Mumbai · Banking",b:"Quarterly results showed a rise in unpaid loans at several large lenders, mostly from small businesses and unsecured personal loans. Banks will have to set aside more money to cover possible losses.",m:-1,s:{Banking:-9},l:'When borrowers stop repaying, bank profits fall and so do bank shares.'},
 {h:'Investors question sky-high tech valuations',d:"Global · Markets",b:"Investors worldwide are asking whether technology shares have risen too far, too fast after a long rally. Several brokerages cut their ratings on IT stocks, citing slower spending by clients.",m:-1,s:{IT:-9},l:'Popular shares can fall hard when the excitement fades.'}
];
const CRASH = {h:'Global markets tumble on recession fears',d:"Global · Markets",b:"Stock markets across the US, Europe and Asia fell sharply as new data raised fears of a global recession. Investors rushed out of shares and into gold and government bonds.",m:-16,s:{},crash:true,l:'Crashes hit everything at once. Safer investments fell less, and selling now would lock in the loss.'};
const RECOVER = {h:'Inflation cools and markets rebound',d:"Global · Economy",b:"Inflation came in lower than expected in major economies, raising hopes of interest-rate cuts. Markets bounced back strongly, led by the shares that fell most in the recent sell-off.",m:10,s:{},l:'Markets have recovered from every past crash, though nobody knows how long each one takes.'};
const LEVELS = ['Calf','Young bull','Street bull','Raging bull','Bullsy legend'], XP_STEP = 300;
const MISSIONS = {
  spread:{n:'Spread out',d:'Hold 3 sectors'},
  full:{n:'Full house',d:'Hold all 5 sectors'},
  streak:{n:'Hot streak',d:'3 right calls in a row'},
  nerves:{n:'Steel nerves',d:'No selling after a crash'},
  bear:{n:'Bear hug',d:'Profit from a short'},
  index:{n:'Beat the market',d:'Finish above the index'}
};

/* ================= Helpers ================= */
const $ = s => document.querySelector(s);
const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
const sinr = n => (n >= 0 ? '+' : '-') + inr(Math.abs(n));
const pct = n => (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
const cls = n => n >= 0 ? 'up' : 'down';
const arr = n => n >= 0 ? '▲' : '▼';
const randn = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const SECEMO = { Banking: '🏦', IT: '💻', Automobiles: '🚗', Pharma: '💊', Energy: '⚡' };
const store = { get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
/* Theme: the saved choice wins; with none saved the page follows the device setting. */
const ROOT = document.documentElement;
const isDark = () => ROOT.dataset.theme ? ROOT.dataset.theme === 'dark' : !!(window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
(() => { const t = store.get('bullsy-theme'); if (t === 'dark' || t === 'light') ROOT.dataset.theme = t; })();
let themeFx = 0;
function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  document.body.classList.add('themefx'); clearTimeout(themeFx); themeFx = setTimeout(() => document.body.classList.remove('themefx'), 320);
  ROOT.dataset.theme = next; store.set('bullsy-theme', next); window.dispatchEvent(new Event('resize'));
}
function logo(a, big) {
  const L = LOGOS[a.sym], ini = `<span class="lg ini${big ? ' big' : ''}" style="background:${SECCOL[a.sector]}" aria-hidden="true">${a.sym.slice(0, 2)}</span>`;
  if (!L) return ini;
  return `<span class="lg${big ? ' big wide' : ''}" data-ini="${a.sym.slice(0, 2)}" data-col="${SECCOL[a.sector]}"><img src="${big ? L.f : L.m}" alt="${big ? a.name + ' logo' : ''}"></span>`;
}
document.addEventListener('error', e => { const i = e.target; if (i.tagName === 'IMG' && i.parentNode.classList.contains('lg')) { const p = i.parentNode; p.classList.add('ini'); p.classList.remove('wide'); p.style.background = p.dataset.col; p.textContent = p.dataset.ini; } }, true);

/* ================= Sound and voice ================= */
let actx = null, muted = store.get('bullsy-muted') === '1';
function tone(f, d, type, when, vol) {
  if (muted) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const t = actx.currentTime + (when || 0), o = actx.createOscillator(), g = actx.createGain();
    o.type = type || 'triangle'; o.frequency.value = f;
    g.gain.setValueAtTime(vol || .07, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d);
  } catch (e) {}
}
const sfx = {
  buy: () => { tone(660, .08); tone(990, .14, 'triangle', .08); },
  sell: () => { tone(440, .08); tone(330, .14, 'triangle', .08); },
  up: () => [523, 659, 784].forEach((f, i) => tone(f, .16, 'triangle', i * .1)),
  down: () => [392, 330, 247].forEach((f, i) => tone(f, .2, 'sawtooth', i * .12, .04)),
  level: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, .18, 'square', .3 + i * .09, .04)),
  tap: () => tone(700, .04, 'square', 0, .025)
};
function toast(text) {
  const d = document.createElement('div'); d.className = 'toast'; d.textContent = text;
  $('#toasts').appendChild(d); setTimeout(() => d.remove(), 2700);
}
const Voice = (() => {
  const ok = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voice = null, cur = null, state = 'idle', failed = false;
  function choose() { try { const vs = speechSynthesis.getVoices(); voice = vs.find(v => /en[-_]IN/i.test(v.lang)) || vs.find(v => /en[-_]GB/i.test(v.lang)) || vs.find(v => /^en/i.test(v.lang)) || null; } catch (e) {} }
  if (ok) { choose(); try { speechSynthesis.addEventListener('voiceschanged', choose); } catch (e) {} }
  function set(s) { state = s; paint(); }
  function paint() {
    const c = $('#mcard'); if (!c) return;
    c.classList.toggle('speaking', state === 'speaking');
    const p = $('#vpause'); if (p) { p.textContent = state === 'paused' ? '▶ Resume' : '⏸ Pause'; p.disabled = state === 'idle'; }
    const cap = $('#cap'); if (cap) cap.hidden = ok && !muted && !failed;
    const m = $('#vmute'); if (m) m.textContent = muted ? '🔇 Unmute' : '🔊 Mute';
  }
  function stop() { cur = null; if (ok) try { speechSynthesis.cancel(); } catch (e) {} set('idle'); }
  function speak(text) {
    stop(); if (!ok || muted || !text) return;
    const u = new SpeechSynthesisUtterance(text); cur = u;
    if (voice) u.voice = voice; u.lang = voice ? voice.lang : 'en-IN'; u.rate = .97;
    u.onend = () => { if (cur === u) { cur = null; set('idle'); } };
    u.onerror = ev => { if (cur === u) { cur = null; if (ev.error !== 'interrupted' && ev.error !== 'canceled') failed = true; set('idle'); } };
    set('speaking');
    setTimeout(() => { if (cur === u) try { speechSynthesis.speak(u); } catch (e) { failed = true; set('idle'); } }, 70);
  }
  function toggle() { if (!ok) return; try { if (state === 'speaking') { speechSynthesis.pause(); set('paused'); } else if (state === 'paused') { speechSynthesis.resume(); set('speaking'); } } catch (e) {} }
  return { speak, stop, toggle, paint };
})();

/* ================= Voiced pop-up ================= */
let M = null;
function openModal(m) {
  M = m;
  $('#mcard').innerHTML = `
    <div class="mtop ${m.calm ? 'calm' : ''}"><span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>${m.kicker}<span>${m.tag || ''}</span><button class="mx" data-act="m-close" aria-label="Close">✕</button></div>
    <div class="mbody">${m.html}<p id="cap" hidden>${m.script}</p>${m.foot ? `<small class="nfoot">${m.foot}</small>` : ''}</div>
    <div class="mctl"><button class="btn ghost sm" data-act="v-replay">↻ Replay</button><button class="btn ghost sm" id="vpause" data-act="v-pause">⏸ Pause</button><button class="btn ghost sm" id="vmute" data-act="mute">🔊 Mute</button><button class="btn" id="mgo" data-act="m-close">${m.cta}</button></div>`;
  $('#modal').hidden = false; Voice.speak(m.script); Voice.paint(); $('#mgo').focus();
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') { const o = document.getElementById('vguide'); if (o) o.remove(); } });
/* Quick user guide: a 7-step quest the player clicks through on the start screen */
const UGUIDE = [
  ['💰', 'Pick your cash', 'Choose ₹25,000, ₹1 lakh, ₹5 lakh or a custom amount, then tap <b>Start game</b>.'],
  ['📰', 'Hear the news', 'Each round opens with a breaking headline, read aloud. Think: which sectors does it help or hurt? Then tap <b>Start trading</b>.'],
  ['📊', 'Pick a stock', 'Tap any company in <b>Market Watch</b>. Check its chart (1D to 1Y, line or candles, zoom with <b>+ / −</b>) and its sector index.'],
  ['🛒', 'Trade', 'Set the quantity and tap <b>Buy</b>. Tap <b>Sell</b> to take profit, or <b>Short</b> to earn if you think the price will fall.'],
  ['↺', 'Fix a mistake', 'Changed your mind? Tap <b>↺</b> on the stock to undo its trades this round, before you call the market.'],
  ['📈', 'Call the market', 'Tap <b>▲ Rise</b> or <b>▼ Fall</b> to end the round. Use a <b>Hint</b> for a clue or a <b>Shield</b> to cut a loss. 8 rounds, one surprise crash: don’t panic-sell!'],
  ['🤖', 'Get your report', 'The <b>Bullsy AI Advisor</b> scores you out of 100, shows what went well and what to fix, and compares you with Bullsy AI. Then tap <b>🚀 Play Again</b>.']
];
let ugStep = 0;
function ugPaint() {
  const o = document.getElementById('uguide'); if (!o) return; const g = UGUIDE[ugStep], last = ugStep === UGUIDE.length - 1;
  o.querySelector('.ugbody').innerHTML = `<div class="ugbar" aria-hidden="true"><i style="width:${(ugStep + 1) / UGUIDE.length * 100}%"></i></div>
    <span class="lab">Training mission · step ${ugStep + 1} of ${UGUIDE.length}</span>
    <div class="ugico" aria-hidden="true">${g[0]}</div><h2>${g[1]}</h2><p>${g[2]}</p>
    <div class="ugdots" aria-hidden="true">${UGUIDE.map((_, i) => `<i class="${i < ugStep ? 'done' : i === ugStep ? 'on' : ''}"></i>`).join('')}</div>`;
  o.querySelector('.ugft').innerHTML = `<button class="btn ghost" data-act="ug-prev" ${ugStep ? '' : 'disabled'}>← Back</button>${last ? '<button class="btn go" data-act="ug-start">🏁 I’m ready · Start game</button>' : '<button class="btn" data-act="ug-next">Next →</button>'}`;
}
function ugOpen() {
  Voice.stop(); ugStep = 0; const o = document.createElement('div'); o.id = 'uguide'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'Bullsy quick user guide');
  o.innerHTML = `<div class="ugcard"><div class="vghd"><b>📘 Bullsy quick guide</b><button class="mx" data-act="ug-close" aria-label="Close guide">✕</button></div><div class="ugbody" aria-live="polite"></div><div class="ugft"></div></div>`;
  o.addEventListener('click', e => { if (e.target === o) o.remove(); }); document.body.appendChild(o); ugPaint(); o.querySelector('.mx').focus();
}
document.addEventListener('keydown', e => { const o = document.getElementById('uguide'); if (!o) return; if (e.key === 'Escape') o.remove(); else if (e.key === 'ArrowRight' && ugStep < UGUIDE.length - 1) { ugStep++; ugPaint(); } else if (e.key === 'ArrowLeft' && ugStep) { ugStep--; ugPaint(); } });
function closeModal() { if (!M) return; const m = M; M = null; Voice.stop(); $('#modal').hidden = true; if (m.after) m.after(); }
function openNews() {
  const ev = S.events[S.round], per = period(), n = S.round + 1;
  const big = Object.keys(ev.s).sort((x, y) => Math.abs(ev.s[y]) - Math.abs(ev.s[x]))[0];
  let chips = '';
  if (S.hintOn) {
    chips = (ev.noise ? '<span class="chip">🤷 Likely noise</span>' : `<span class="chip ${ev.m >= 2 ? 'up' : ev.m <= -2 ? 'down' : ''}">Market ${ev.m >= 2 ? '▲' : ev.m <= -2 ? '▼' : '◆'}</span>`) +
      Object.keys(ev.s).map(k => `<span class="chip ${cls(ev.s[k])}">${SECEMO[k]} ${k} ${arr(ev.s[k])}</span>`).join('');
  }
  openModal({ kicker: 'Breaking news', tag: 'Round ' + n + '/' + ROUNDS,
    html: `<div class="mico" aria-hidden="true">${ev.crash ? '⛈️' : ev.noise ? '📱' : big ? SECEMO[big] : '🌐'}</div>${ev.d ? `<div class="ndl">${ev.d}</div>` : ''}<h2 class="mhead" id="mhead">${ev.h}</h2>${ev.b ? `<p class="nbody">${ev.b}</p>` : ''}
      <div class="chips">${chips || `<button class="chip" data-act="hint" ${S.hints ? '' : 'disabled'}>🔮 Analyst hint · ${S.hints}</button>`}</div>`,
    script: ev.h + '.' + (S.hintOn ? ' Analyst hint. ' + hintText(ev) : ''),
    cta: 'Start trading', foot: 'Simulated news for the game · Bullsy Market Desk' });
}
function openResult() {
  const r = S.recap, fin = S.phase === 'result', best = r.movers[0], worst = r.movers[r.movers.length - 1];
  const mv = x => `<span class="chip ${cls(x.last)}">${logo(x)} ${x.sym} <b class="num">${pct(x.last)}</b></span>`;
  openModal({ kicker: 'Round ' + r.n + ' result', tag: r.right ? '✅ Good call' : '❌ Wrong call', calm: true,
    html: `<div class="bigpl num ${cls(r.delta)}" id="mhead">${arr(r.delta)} ${sinr(r.delta)}</div>
      <div class="chips"><span class="chip ${cls(r.you)}">You <b class="num">${pct(r.you)}</b></span><span class="chip ${cls(r.mkt)}">Market <b class="num">${pct(r.mkt)}</b></span><span class="chip">⭐ +${r.xp} XP</span>${r.streak > 1 ? `<span class="chip">🔥 ${r.streak}</span>` : ''}</div>
      <div class="chips">${mv(best)}${mv(worst)}</div><p class="oneline muted">${r.shield || r.l}</p>`,
    script: 'Round ' + r.n + ' result. The market ' + (r.mkt >= 0 ? 'rose ' : 'fell ') + Math.abs(r.mkt).toFixed(1) + ' percent. Your portfolio ' + (r.delta >= 0 ? 'gained ' : 'lost ') + Math.round(Math.abs(r.delta)) + ' rupees. ' + r.l + ' ' + (r.right ? 'Good call.' : 'Wrong call, your streak resets.') + (r.shield ? ' ' + r.shield : ''),
    cta: fin ? 'See my report' : 'Next round', after: () => { ($('#wrap').scrollTop = 0); fin ? openCoach() : openNews(); } });
}
/* ================= Bullsy AI Advisor =================
   Rule-based analysis of the player's real game: journal (S.log.j), round snapshots (S.log.snap), net worth (S.vHist) and prices (a.hist).
   Every sentence is built from numbers the player actually produced; nothing is invented. Bullsy AI = an investor who puts the same
   starting cash equally into all 15 stocks in round 1 and holds, priced on the same in-game prices. */
function advise(f) {
  const J = S.log.j || [], SN = S.log.snap || [], N = S.round, avg = a => a.length ? a.reduce((t, v) => t + v, 0) / a.length : 0;
  const px = (a, k) => a.hist[a.hist.length - 1 - (N - k)];             // price of asset a at round k (0 = start)
  const pc = n => (n >= 0 ? '+' : '') + n.toFixed(1) + '%';
  /* positions: closed trades + open positions marked to the final price */
  const closed = J.filter(x => x.gain != null && x.ret != null).map(x => ({ sym: x.sym, id: x.id, ret: x.ret, gain: x.gain, r: x.r, side: x.side, px: x.px, open: false }));
  const opens = Object.keys(S.hold).map(id => { const a = A(id), gain = S.hold[id] * a.price - S.cost[id]; return { sym: a.sym, id, ret: gain / Math.abs(S.cost[id]) * 100, gain, side: S.hold[id] > 0 ? 'long' : 'short', open: true }; });
  const pos = closed.concat(opens), wins = pos.filter(p => p.gain > 0), losses = pos.filter(p => p.gain < 0);
  const best = pos.slice().sort((x, y) => y.ret - x.ret)[0], worst = pos.slice().sort((x, y) => x.ret - y.ret)[0];
  const invSn = SN.filter(x => x.inv > 0), maxSec = SN.reduce((m, x) => Math.max(m, x.sec), 0), avgTop = avg(invSn.map(x => x.top));
  const topCount = {}; invSn.forEach(x => { if (x.top > .5) topCount[x.topId] = (topCount[x.topId] || 0) + 1; });
  const heavyId = Object.keys(topCount).sort((x, y) => topCount[y] - topCount[x])[0];
  const cashPct = avg(S.log.cash) * 100, ret = f.ret, iret = f.iret, nT = J.length;
  /* Bullsy AI investor */
  const each = setup.budget / S.assets.length; let aiCash = setup.budget; const units = S.assets.map(a => { const u = Math.floor(each / px(a, 0)); aiCash -= u * px(a, 0); return u; });
  const aiPath = []; for (let k = 0; k <= N; k++) aiPath.push(aiCash + S.assets.reduce((t, a, i) => t + units[i] * px(a, k), 0));
  const aiRet = (aiPath[N] / setup.budget - 1) * 100;
  /* behaviour signals */
  const newsT = J.filter(x => x.ns), withNews = newsT.filter(x => ((x.side === 'buy' || x.side === 'cover') ? x.ns > 0 : x.ns < 0)).length;
  const firstBuy = {}; J.forEach(x => { if ((x.side === 'buy' || x.side === 'short') && firstBuy[x.id] == null) firstBuy[x.id] = x.r; });
  const heldLoser = pos.filter(p => p.ret < -8 && (p.open ? N : p.r) - (firstBuy[p.id] ?? 0) >= 3).sort((x, y) => x.ret - y.ret)[0];
  const earlyExit = closed.filter(p => p.side === 'sell' && p.gain > 0).map(p => ({ ...p, after: (A(p.id).price / p.px - 1) * 100 })).filter(p => p.after > 5).sort((x, y) => y.after - x.after)[0];
  const chase = J.filter(x => x.side === 'buy' && x.r > 0).map(x => { const a = A(x.id), jump = (px(a, x.r) / px(a, x.r - 1) - 1) * 100, later = (a.price / x.px - 1) * 100; return { ...x, jump, later }; }).filter(x => x.jump > 5 && x.later < 0).sort((x, y) => y.jump - x.jump)[0];
  const rr = S.vHist.slice(1).map((v, i) => ({ n: i + 1, ret: (v / S.vHist[i] - 1) * 100, h: S.events[i].h }));
  const bestR = rr.slice().sort((x, y) => y.ret - x.ret)[0], worstR = rr.slice().sort((x, y) => x.ret - y.ret)[0];
  const I0 = S.log.init || { cash: setup.budget, hold: {} }, holdVal = I0.cash + Object.keys(I0.hold).reduce((t, id) => t + I0.hold[id] * A(id).price, 0), churn = holdVal - f.fin;
  const lateT = S.log.trades, overtrade = lateT >= 10 && churn > setup.budget * .01;
  /* labels */
  const div = maxSec >= 4 && avgTop < .45 ? 'Good' : maxSec >= 2 ? 'Moderate' : 'Low';
  const rs = invSn.length ? avg(invSn.map(x => x.risk)) + (avgTop > .6 ? .5 : 0) + (S.usedShort ? .3 : 0) : 0;
  const risk = !invSn.length || rs < 1.7 ? 'Low' : rs < 2.4 ? 'Medium' : 'High';
  /* score out of 100 */
  const cl = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const sc = { perf: cl(20 + 2 * (ret - iret), 0, 40), div: cl([0, 3, 7, 11, 15, 15][maxSec] - (avgTop > .6 ? 4 : 0), 0, 15), cash: cl(10 - Math.max(0, cashPct - 10) / 6, 0, 10),
    disc: pos.length ? cl(wins.length / pos.length * 10 + (worst.ret > -10 ? 5 : worst.ret > -20 ? 2 : 0), 0, 15) : 5, calls: S.right / Math.max(1, N) * 10, nerve: S.panic ? 2 : S.heldCrash ? 10 : 6 };
  const score = Math.round(cl(Object.values(sc).reduce((t, v) => t + v, 0), 0, 100));
  /* insights */
  const good = [], bad = [], next = [];
  if (ret > iret) good.push(`You beat the market index by ${(ret - iret).toFixed(1)} points (${pc(ret)} vs ${pc(iret)}).`);
  if (maxSec >= 3) good.push(`You held ${maxSec} sectors at the same time, so one bad headline could not sink your whole portfolio.`);
  if (S.heldCrash && !S.panic) good.push(`You stayed calm in the round ${S.crashAt + 1} crash and did not sell at the bottom.`);
  if (best && best.ret > 5) good.push(`Your best move was ${best.sym}${best.side === 'short' || best.side === 'cover' ? ' (short)' : ''}: ${pc(best.ret)}${best.open ? ' and still open' : ''}.`);
  if (pos.length >= 3 && wins.length / pos.length >= .6) good.push(`${wins.length} of your ${pos.length} positions made money. That is a strong hit rate.`);
  if (N && S.right >= Math.max(2, Math.ceil(N * .6))) good.push(`You called the market right in ${S.right} of ${N} round${N === 1 ? '' : 's'}.`);
  if (newsT.length >= 2 && withNews / newsT.length >= .67) good.push(`You read the news well: ${withNews} of ${newsT.length} news-linked trades went the way the headline pointed.`);
  if (invSn.length && cashPct < 10) good.push(`You kept your money working: only ${cashPct.toFixed(0)}% sat idle in cash on average.`);
  if (S.missions.bear) good.push('You made a profit from a short, which means you can earn when prices fall too.');
  if (S.panic) bad.push(`You sold in round ${S.crashAt + 2}, right after the crash, when prices were lowest.`);
  if (!J.length) bad.push('You did not place a single trade, so your money never had a chance to grow.');
  if (overtrade) bad.push(`You made ${lateT} trades after round 1. Simply holding your first picks would have earned ${inr(churn)} more.`);
  if (heavyId && avgTop > .5) bad.push(`Most of your money at risk sat in ${A(heavyId).sym} for ${topCount[heavyId]} rounds. One stock had too much say over your result.`);
  else if (J.length && maxSec <= 1) bad.push('All your money stayed in one sector, so every sector headline hit you at full force.');
  if (cashPct > 25 && J.length) bad.push(`About ${cashPct.toFixed(0)}% of your cash sat idle on average, earning nothing.`);
  if (heldLoser) bad.push(heldLoser.side === 'short' || heldLoser.side === 'cover' ? `You kept your ${heldLoser.sym} short open while the price rose against you (${pc(heldLoser.ret)}). Close a losing short early.` : `You held ${heldLoser.sym} while it fell to ${pc(heldLoser.ret)}${heldLoser.open ? ' and still hold it' : ''}. Cutting a loser early protects your cash.`);
  if (earlyExit) bad.push(`You sold ${earlyExit.sym} for a profit, but it rose another ${earlyExit.after.toFixed(1)}% after you sold.`);
  if (chase) bad.push(`You bought ${chase.sym} right after it jumped ${chase.jump.toFixed(1)}% in a round, and it then fell ${Math.abs(chase.later).toFixed(1)}% below your price.`);
  if (worst && worst.ret < -10 && worst !== heldLoser) bad.push(`Your worst position, ${worst.sym}, lost ${Math.abs(worst.ret).toFixed(1)}%. A smaller position would have limited the damage.`);
  if (newsT.length >= 2 && withNews / newsT.length < .4) bad.push(`Only ${withNews} of your ${newsT.length} news-linked trades went the way the headline pointed.`);
  if (ret < iret && !bad.length) bad.push(`The market index returned ${pc(iret)}, ahead of your ${pc(ret)}.`);
  if (S.hints + S.shields > 0 && bad.length < 2) bad.push(`You ${S.early ? 'still had' : 'finished with'} ${S.hints + S.shields} power-up${S.hints + S.shields > 1 ? 's' : ''} unused. The hedge shield is worth most on a scary headline.`);
  if (good.length < 2) good.push(S.early ? (N ? `You played ${N} of ${ROUNDS} rounds and made ${S.right} right market call${S.right === 1 ? '' : 's'}.` : 'You set up your game and started making decisions.') : S.right >= 5 ? `You finished all ${ROUNDS} rounds and lost nothing along the way.` : `You finished all ${ROUNDS} rounds and made ${S.right} right market call${S.right === 1 ? '' : 's'}.`);
  if (good.length < 2 && !J.length && !S.early) good.push(`You saw every headline through to the end, including the round ${S.crashAt + 1} crash.`);
  if (good.length < 2 && J.length) good.push(`You placed ${nT} trade${nT === 1 ? '' : 's'} and tested your ideas with real decisions.`);
  if (bad.length < 2) bad.push(risk === 'Low' ? 'You played it very safe. A little more risk could raise your return.' : best && worst && best !== worst ? `Your weakest position, ${worst.sym} (${pc(worst.ret)}), lagged your best, ${best.sym} (${pc(best.ret)}). Picking is where you can still gain.` : 'Keep each position a similar size so one stock cannot decide your game.');
  if (!J.length) next.push('Start small: put part of your cash into 2 or 3 low-risk stocks in round 1.');
  if (heldLoser && (heldLoser.side === 'short' || heldLoser.side === 'cover')) next.push('Set a limit: close a short if the price rises about 10% against you.');
  if (S.panic || (heldLoser && heldLoser.side !== 'short' && heldLoser.side !== 'cover')) next.push('Before you sell, ask: has the company changed, or is this just short-term fear?');
  if (overtrade) next.push('Trade less. Only act when a headline clearly changes a sector, and let your winners run.');
  if ((heavyId && avgTop > .5) || (J.length && maxSec <= 1)) next.push('Spread your money across at least 3 sectors and keep any one stock under a third of your portfolio.');
  if (cashPct > 25 && J.length) next.push('Put idle cash into a low-risk stock instead of leaving it unused.');
  if (earlyExit) next.push('When a stock is still rising, sell part of it and keep the rest.');
  if (chase) next.push('Do not chase a stock that already jumped. Wait one round for the price to settle.');
  if (newsT.length >= 2 && withNews / newsT.length < .4) next.push('Read which sectors the headline helps and which it hurts before you trade.');
  next.push('Keep some cash ready for a crash. That is when good stocks get cheap.');
  next.push('Before reacting to news, check if it changes the company for good or only for a few days.');
  const persona = ret > iret + 5 && score >= 70 ? '🔥 Excellent run. You combined strong timing with disciplined position sizing.'
    : !J.length ? '💡 You watched from the sidelines. The game rewards small, sensible risks.'
    : overtrade ? '⚡ You traded aggressively. Try being more selective and waiting for stronger opportunities.'
    : heavyId && avgTop > .5 ? '📊 Most of your money was concentrated in one stock. Spreading it could reduce single-stock risk.'
    : S.panic ? '📰 You reacted quickly to scary news. Next time, pause and judge whether it has a lasting impact.'
    : ret < 0 ? '💡 A loss is part of learning. Your biggest opportunity is better entry and exit decisions.'
    : '👍 Solid game. A few sharper decisions will push you past the market.';
  const gap = ret - aiRet, aiWhy = gap >= 0
    ? (best && best.gain > 0 ? `You beat Bullsy AI by ${gap.toFixed(1)} points, helped most by ${best.sym} (${pc(best.ret)}).` : `You beat Bullsy AI by ${gap.toFixed(1)} points.`)
    : !J.length ? `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead because it invested while your money stayed in cash.`
    : S.panic ? `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead mainly because it held through the crash while you sold.`
    : heavyId && avgTop > .5 ? `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead mainly because it spread its money over all 15 stocks while yours leaned on ${A(heavyId).sym}.`
    : cashPct > 25 ? `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead mainly because it stayed fully invested while about ${cashPct.toFixed(0)}% of your cash sat idle.`
    : worst && worst.gain < 0 ? `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead. Your ${worst.sym} position (${pc(worst.ret)}) was the biggest drag.`
    : `Bullsy AI finished ${Math.abs(gap).toFixed(1)} points ahead by staying spread across all 15 stocks.`;
  return { score, persona, good: good.slice(0, 3), bad: bad.slice(0, 3), next: Array.from(new Set(next)).slice(0, 3), ret, aiRet, aiWhy, risk, div, trades: nT,
    best: best ? { sym: best.sym, ret: best.ret } : null, worst: worst ? { sym: worst.sym, ret: worst.ret } : null, bestR, worstR, wins: wins.length, losses: losses.length, posN: pos.length };
}
function advisorCard() {
  const v = S.final && S.final.adv; if (!v) return '';
  const pc = n => (n >= 0 ? '+' : '') + n.toFixed(1) + '%', C = 2 * Math.PI * 42, col = v.score >= 70 ? 'var(--up)' : v.score >= 45 ? 'var(--accent)' : 'var(--down)';
  const mx = Math.max(Math.abs(v.ret), Math.abs(v.aiRet), 1), bar = (r, c) => `<div class="advbar"><i style="width:${Math.max(3, Math.abs(r) / mx * 100)}%;background:${c}"></i></div>`;
  const met = [['Return', `<span class="${cls(v.ret)}">${pc(v.ret)}</span>`], ['Risk level', v.risk], ['Trades', v.trades], ['Best trade', v.best ? `<span class="${cls(v.best.ret)}">${pc(v.best.ret)}</span> <small>${v.best.sym}</small>` : '—'],
    ['Worst trade', v.worst ? `<span class="${cls(v.worst.ret)}">${pc(v.worst.ret)}</span> <small>${v.worst.sym}</small>` : '—'], ['Diversification', v.div]];
  return `<section class="card adv" aria-label="Bullsy AI Advisor">
  <div class="advhd"><div><h3>🤖 Bullsy AI Advisor</h3><p>“Here’s what I learned from your trading decisions.”</p></div><button class="btn ghost sm" data-act="adv-voice">🔊 Hear it</button></div>
  <div class="advtop">
    <div class="advscore"><svg viewBox="0 0 100 100" role="img" aria-label="Trading score ${v.score} out of 100"><circle cx="50" cy="50" r="42" fill="none" stroke="var(--line)" stroke-width="9"/><circle cx="50" cy="50" r="42" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(C * v.score / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 50 50)"/></svg>
      <div><b class="num">${v.score}</b><span>/100</span></div></div>
    <div class="advmid"><span class="lab">Trading score</span><p class="advp">${v.persona}</p>
      <div class="advmet">${met.map(m => `<div><span class="lab">${m[0]}</span><b class="num">${m[1]}</b></div>`).join('')}</div></div>
  </div>
  <div class="advcols">
    <div class="advc ok"><h4>What you did well ✅</h4><ul>${v.good.map(t => `<li>${t}</li>`).join('')}</ul></div>
    <div class="advc warn"><h4>Where you can improve ⚠️</h4><ul>${v.bad.map(t => `<li>${t}</li>`).join('')}</ul></div>
    <div class="advc plan"><h4>Your next-move strategy 🎯</h4><ul>${v.next.map(t => `<li>${t}</li>`).join('')}</ul></div>
  </div>
  <div class="advvs"><span class="lab">You vs Bullsy AI</span>
    <div class="advrow"><span>You</span>${bar(v.ret, v.ret >= 0 ? 'var(--accent)' : 'var(--down)')}<b class="num ${cls(v.ret)}">${pc(v.ret)}</b></div>
    <div class="advrow"><span>Bullsy AI</span>${bar(v.aiRet, 'var(--brand-line)')}<b class="num ${cls(v.aiRet)}">${pc(v.aiRet)}</b></div>
    <p>${v.aiWhy}</p><small class="muted">Bullsy AI puts the same starting cash equally into all 15 stocks in round 1 and holds.</small></div>
  <div class="advtip"><b>💡 Next game tip</b><span>${v.next[0]}</span></div>
</section>`;
}
function openCoach() {
  const f = S.final, t = f.review.tips.slice(0, 3);
  openModal({ kicker: 'Coach review', tag: f.title, calm: true,
    html: `<img class="mlogo" src="${BULL_MARK}" alt=""><h2 class="mhead calm" id="mhead">3 ways to lift your return</h2><ul class="tips">${t.map(x => `<li>${x.s}</li>`).join('')}</ul>`,
    script: 'Game over. You finished as a ' + f.title + ', with a return of ' + f.ret.toFixed(1) + ' percent. Here are three ways to improve. ' + t.map((x, i) => ['One. ', 'Two. ', 'Three. '][i] + x.l).join(' '),
    cta: 'Done' });
}

/* ================= Game state ================= */
let setup = { budget: 100000, fav: 'Banking', risk: 2, horizon: 'long' };
let S = null, tab = 'chart', mtab = 'all', watch = new Set(), setupErr = '';
const A = id => S.assets.find(a => a.id === id);
const invested = () => Object.keys(S.hold).reduce((t, id) => t + S.hold[id] * A(id).price, 0);
const total = () => S.cash + invested();
const shortVal = () => Object.keys(S.hold).reduce((t, id) => t + (S.hold[id] < 0 ? -S.hold[id] * A(id).price : 0), 0);
/* cash not tied up: a short locks its sale money plus the same again as a deposit, so it uses free cash just like a buy */
const free = () => S.cash - 2 * shortVal();
const period = () => setup.horizon === 'short' ? 'month' : 'year';
const level = () => Math.min(LEVELS.length, 1 + Math.floor(S.xp / XP_STEP));
const chg = a => S && S.round ? a.last : a.days[a.days.length - 1].chg;
function spread() { const s = new Set(Object.keys(S.hold).map(id => A(id).sector)); return s.size; }

function addXP(n, why) {
  const before = level(); S.xp += n; S.roundXP += n; if (!S.quiet) toast('+' + n + ' XP · ' + why);
  if (level() > before) { toast('⬆ Level ' + level() + ' · ' + LEVELS[level() - 1]); sfx.level(); }
}
function done(key) { if (S.missions[key]) return; S.missions[key] = true; addXP(100, MISSIONS[key].n); }

function newGame() {
  clearResult();
  if (typeof Z !== 'undefined') Z.key = '';
  atHome = false;
  const dt = setup.horizon === 'short' ? 1 / 12 : 1;
  const assets = ASSETS.map(a => Object.assign({}, PROFILE[a.risk], a, { hist: a.hist.slice(), last: 0, p0: a.price }));
  const ev = shuffle(EVENTS).slice(0, ROUNDS - 2), ci = 2 + Math.floor(Math.random() * 3);
  ev.splice(ci, 0, CRASH); ev.splice(ci + 1 + Math.floor(Math.random() * (ROUNDS - 1 - ci)), 0, RECOVER);
  S = { phase: 'play', dt, round: 0, cash: setup.budget, assets, events: ev, hold: {}, cost: {}, sel: assets.find(a => a.sector === setup.fav && a.risk === setup.risk).id, qty: 1,
        vHist: [setup.budget], iHist: [setup.budget], fHist: [setup.budget], index: 100, crashAt: ci,
        panic: false, heldCrash: false, inChar: false, bought: false, recap: null,
        xp: 0, roundXP: 0, streak: 0, right: 0, hints: 2, shields: 1, hintOn: false, shieldOn: false,
        missions: { spread: false, full: false, streak: false, nerves: false, bear: false, index: false }, usedShort: false, chartMode: 'line', range: 'all', anim: true, final: null,
        log: { cash: [], trades: 0, init: null, real: {} }, ai: null };
  tab = 'chart'; mtab = 'all';
  render(); openNews();
}
function flash(m) { toast(m); render(); }
function qtyOk(q) { if (q >= 1) return true; flash('Quantity must be 1 or more'); return false; }
/* Trade journal for the AI Advisor: one entry per real action the player takes. Logging only. */
/* Undo: within a round prices do not move, so a stock's trades this round can be reversed exactly. */
function undoMark(a) { S.undo = S.undo || {}; if (!S.undo[a.id]) S.undo[a.id] = { hold: S.hold[a.id] || 0, cost: S.cost[a.id] || 0, real: S.log.real[a.id], panic: S.panic, cash: 0, n: 0 }; }
function undoNote(a, d) { const u = S.undo[a.id]; u.cash += d; u.n++; }
function undoStock(id) {
  const u = S.undo && S.undo[id], a = A(id); if (!u || !u.n) return;
  S.cash -= u.cash;
  if (u.hold) { S.hold[id] = u.hold; S.cost[id] = u.cost; } else { delete S.hold[id]; delete S.cost[id]; }
  if (u.real == null) delete S.log.real[id]; else S.log.real[id] = u.real;
  S.log.j = (S.log.j || []).filter(x => !(x.r === S.round && x.id === id));
  if (S.round) S.log.trades = Math.max(0, S.log.trades - u.n);
  S.panic = u.panic || (S.log.j || []).some(x => x.side === 'sell' && x.r === S.crashAt + 1);
  delete S.undo[id]; S.qty = 1; sfx.tap(); flash('Undid your ' + a.sym + ' trades this round');
}
function jot(side, a, q, gain, basis) {
  const ev = S.events[S.round] || { s: {} }; (S.log.j = S.log.j || []).push({ r: S.round, id: a.id, sym: a.sym, sector: a.sector, side, q, px: a.price,
    ns: ev.s[a.sector] || 0, crash: !!ev.crash, gain: gain == null ? null : gain, ret: gain == null || !basis ? null : gain / basis * 100 });
}
function opened() { if (!S.bought) { S.bought = true; addXP(20, 'First trade'); } if (spread() >= 3) done('spread'); if (spread() >= 5) done('full'); if (S.round) S.log.trades++; }
function closeOut(a, q, have, gain) {
  jot(have > 0 ? 'sell' : 'cover', a, q, gain, Math.abs(S.cost[a.id]) * q / Math.abs(have));
  S.log.real[a.id] = (S.log.real[a.id] || 0) + gain; S.cost[a.id] -= S.cost[a.id] * q / Math.abs(have);
  S.hold[a.id] = have > 0 ? have - q : have + q; if (!S.hold[a.id]) { delete S.hold[a.id]; delete S.cost[a.id]; }
  if (S.round) S.log.trades++; S.qty = 1; sfx.sell();
}
function buy() {
  const a = A(S.sel); undoMark(a); const _a = a, q = Math.floor(S.qty), have = S.hold[a.id] || 0, max = Math.max(0, Math.floor(free() / a.price));
  if (!qtyOk(q)) return;
  if (have < 0) return flash('Cover your short first');
  if (q > max) return flash('Not enough cash. Max ' + max);
  S.cash -= q * a.price; S.hold[a.id] = have + q; S.cost[a.id] = (S.cost[a.id] || 0) + q * a.price; S.qty = 1;
  undoNote(a, -q * a.price); jot('buy', a, q); sfx.buy(); opened(); flash('Bought ' + q + ' ' + a.sym);
}
function sell() {
  const a = A(S.sel); undoMark(a); const _a = a, have = S.hold[a.id] || 0, q = Math.floor(S.qty);
  if (!qtyOk(q)) return;
  if (have <= 0 || q > have) return flash('You hold only ' + Math.max(0, have));
  S.cash += q * a.price; undoNote(a, q * a.price); closeOut(a, q, have, q * a.price - S.cost[a.id] * q / have);
  if (S.round === S.crashAt + 1) S.panic = true;
  flash('Sold ' + q + ' ' + a.sym);
}
function shortSell() {
  const a = A(S.sel); undoMark(a); const _a = a, have = S.hold[a.id] || 0, q = Math.floor(S.qty), max = Math.max(0, Math.floor(free() / a.price));
  if (!qtyOk(q)) return;
  if (have > 0) return flash('Sell your shares before shorting');
  if (q > max) return flash('Not enough cash. Max ' + max);
  S.cash += q * a.price; S.hold[a.id] = have - q; S.cost[a.id] = (S.cost[a.id] || 0) - q * a.price; S.qty = 1; S.usedShort = true;
  undoNote(a, q * a.price); jot('short', a, q); sfx.sell(); opened(); flash('Shorted ' + q + ' ' + a.sym);
}
function cover() {
  const a = A(S.sel); undoMark(a); const _a = a, have = S.hold[a.id] || 0, q = Math.floor(S.qty);
  if (!qtyOk(q)) return;
  if (have >= 0 || q > -have) return flash('You are short only ' + Math.max(0, -have));
  const gain = -S.cost[a.id] * q / -have - q * a.price;
  S.cash -= q * a.price; undoNote(a, -q * a.price); closeOut(a, q, have, gain);
  if (gain > 0) done('bear');
  flash('Covered ' + q + ' ' + a.sym + ' · ' + sinr(gain));
}
function hintText(ev) {
  if (ev.noise) return 'Analysts find nothing behind this story. It may be pure noise.';
  const win = Object.keys(ev.s).filter(k => ev.s[k] > 0), lose = Object.keys(ev.s).filter(k => ev.s[k] < 0);
  const mk = ev.m >= 2 ? 'The whole market should get a lift.' : ev.m <= -2 ? 'The whole market is likely to slip.' : 'The wider market may barely move.';
  return mk + (win.length ? ' Likely winners: ' + win.join(', ') + '.' : '') + (lose.length ? ' Likely losers: ' + lose.join(', ') + '.' : '');
}
function advance(call) {
  const ev = S.events[S.round], scale = setup.horizon === 'short' ? 1 : 1.5, dt = S.dt, ids = Object.keys(S.hold);
  S.roundXP = 0; S.quiet = true; S.undo = {};
  if (S.round === 0) { const w = id => Math.abs(S.hold[id]) * A(id).price, inv = ids.reduce((t, id) => t + w(id), 0); S.inChar = Math.abs(ids.reduce((t, id) => t + A(id).risk * w(id), 0) / inv - setup.risk) <= .5; }
  if (ev.crash && ids.length) S.heldCrash = true;
  const postCrash = S.round === S.crashAt + 1;
  const before = total(), m = (ev.m * scale + randn() * 1.2) / 100;
  { const pos = Object.keys(S.hold).map(id => ({ id, v: Math.abs(S.hold[id]) * A(id).price, risk: A(id).risk, sec: A(id).sector })), inv = pos.reduce((t, p) => t + p.v, 0), topP = pos.sort((x, y) => y.v - x.v)[0];
    (S.log.snap = S.log.snap || []).push({ sec: new Set(pos.map(p => p.sec)).size, inv, top: topP && inv ? topP.v / inv : 0, topId: topP ? topP.id : null, risk: inv ? pos.reduce((t, p) => t + p.v * p.risk, 0) / inv : 0 }); }
  S.log.cash.push(Math.max(0, free()) / before);
  if (S.round === 0) S.log.init = { hold: Object.assign({}, S.hold), cash: S.cash };
  S.assets.forEach(a => {
    const g = Math.exp((a.mu - .5 * a.vol * a.vol) * dt + a.vol * Math.sqrt(dt) * randn());
    const np = Math.max(1, a.price * g * (1 + a.beta * m) * (1 + (ev.s[a.sector] || 0) * scale / 100));
    a.last = (np / a.price - 1) * 100; a.price = np; a.hist.push(np);
  });
  const ig = Math.exp((.11 - .5 * .0144) * dt + .12 * Math.sqrt(dt) * randn()) * (1 + m);
  S.index *= ig; S.round++; S.anim = true;
  const secs = SECTORS.map(s => { const g = S.assets.filter(a => a.sector === s); return { s, ret: g.reduce((t, a) => t + a.last, 0) / g.length }; }).sort((x, y) => y.ret - x.ret);
  const topHeld = ids.some(id => S.hold[id] > 0 && A(id).sector === secs[0].s), shortWin = ids.some(id => S.hold[id] < 0 && A(id).last < 0);
  let shield = '';
  if (S.shieldOn) {
    const loss = before - total();
    if (loss > 0) { S.cash += loss / 2; shield = 'Your hedge shield paid back ' + inr(loss / 2) + '.'; } else shield = 'Your hedge shield was not needed this time.';
    S.shieldOn = false;
  }
  S.hintOn = false;
  const after = total(), mkt = (ig - 1) * 100, you = (after / before - 1) * 100, right = (mkt >= 0) === (call === 'up');
  S.vHist.push(after); S.iHist.push(setup.budget * S.index / 100); S.fHist.push(setup.budget * Math.pow(1.065, S.round * dt));
  S.qty = 1;
  addXP(20, 'Round survived');
  if (you > 0) addXP(20, 'Portfolio grew');
  if (topHeld) addXP(30, 'Top sector held');
  if (shortWin) addXP(30, 'Short paid off');
  if (right) { S.streak++; S.right++; addXP(30 + 20 * Math.min(S.streak, 4), 'Good call'); if (S.streak >= 3) done('streak'); } else S.streak = 0;
  if (postCrash && S.heldCrash && !S.panic) done('nerves');
  if (you >= 0) sfx.up(); else sfx.down();
  if (S.round >= ROUNDS) finish();
  S.recap = { n: S.round, h: ev.h, l: ev.l, mkt, you, delta: after - before, call, right, shield, secs, streak: S.streak, xp: S.roundXP, movers: S.assets.slice().sort((x, y) => y.last - x.last) };
  S.quiet = false; render(); openResult();
}
function finish(early) {
  const N = S.round, fin = total(), idx = S.iHist[N], fd = S.fHist[N], ret = (fin / setup.budget - 1) * 100, iret = (idx / setup.budget - 1) * 100;
  S.early = early ? { played: N, of: ROUNDS } : null;
  if (fin > idx) done('index');
  if (Object.keys(S.hold).some(id => S.hold[id] < 0 && S.hold[id] * A(id).price - S.cost[id] > 0)) done('bear');
  let title, line;
  if (S.panic && fin < idx) { title = 'Panic seller'; line = 'You sold at the bottom of the crash.'; }
  else if (ret > iret + 5) { title = 'Market wizard'; line = 'You beat the market by a clear margin.'; }
  else if (ret >= iret - 5) { title = 'Steady investor'; line = 'You finished close to the market.'; }
  else if (ret > 0) { title = 'Slow climber'; line = 'You made money, the market made more.'; }
  else { title = 'Bruised beginner'; line = 'You ended below your start. Practice is free here.'; }
  const score = Math.max(0, S.xp + Math.round(Math.max(-30, ret) * 30));
  let best = null, bestLine = '';
  try { best = JSON.parse(store.get('bullsy-best')); } catch (e) {}
  if (!early && (!best || score > best.score)) { store.set('bullsy-best', JSON.stringify({ score })); bestLine = best ? 'New high score' : ''; }
  else bestLine = early ? (best ? 'Best ' + best.score.toLocaleString('en-IN') : '') : 'Best ' + best.score.toLocaleString('en-IN');
  S.final = { fin, idx, fd, ret, iret, title, line, score, bestLine };
  S.final.review = review(S.final);
  try { S.final.adv = advise(S.final); } catch (e) { S.final.adv = null; }
  S.phase = 'result';
  saveResult();
}
/* Quit in the middle: keep every trade and decision made so far, score it, and open the debrief. Nothing is reset. */
function endEarly() {
  M = null; $('#modal').hidden = true; Voice.stop(); atHome = false;
  if (S && S.phase === 'play') { S.recap = null; finish(true); sfx.tap(); }
  render(); const w = $('#wrap'); if (w) w.scrollTop = 0;
}
/* the debrief survives a page refresh in this tab (session only); a new game or Home clears it */
function saveResult() { try { sessionStorage.setItem('bullsy-result', JSON.stringify({ S, setup })); } catch (e) {} }
function clearResult() { try { sessionStorage.removeItem('bullsy-result'); } catch (e) {} }

/* ================= Coach review: s = short line on screen, l = fuller line that is spoken ================= */
function review(f) {
  const L = Object.assign({}, S.log, { init: S.log.init || { cash: setup.budget, hold: {} } }), avg = a => a.length ? a.reduce((t, v) => t + v, 0) / a.length : 0, tips = [];
  const perf = S.assets.map(a => ({ sym: a.sym, name: a.name, sector: a.sector, risk: RISK[a.risk], ret: +((a.price / a.p0 - 1) * 100).toFixed(1),
    owned: !!(S.hold[a.id] || L.init.hold[a.id] || L.real[a.id] != null) })).sort((x, y) => y.ret - x.ret);
  const touched = Array.from(new Set(Object.keys(S.hold).concat(Object.keys(L.real))));
  const byPl = touched.map(id => ({ sym: A(id).sym, name: A(id).name, profit: Math.round((S.hold[id] ? S.hold[id] * A(id).price - S.cost[id] : 0) + (L.real[id] || 0)) })).sort((x, y) => x.profit - y.profit);
  const holdVal = L.init.cash + Object.keys(L.init.hold).reduce((t, id) => t + L.init.hold[id] * A(id).price, 0);
  const cashPct = avg(L.cash) * 100, top = perf[0], gap = holdVal - f.fin, sp = n => Math.round(Math.abs(n)) + ' rupees';
  if (S.panic) tips.push({ s: '⛈️ Sold in round ' + (S.crashAt + 2) + ', right after the crash', l: 'You sold in the round right after the crash, when prices were lowest. Waiting for the rebound would have kept that money working.' });
  if (gap > setup.budget * .01) tips.push({ s: '🤚 Just holding your first picks: ' + inr(gap) + ' more', l: 'Holding your first portfolio untouched would have earned ' + sp(gap) + ' more. Your later trades cost you money.' });
  else if (gap < -setup.budget * .01 && L.trades) tips.push({ s: '👍 Your later trades added ' + inr(-gap), l: 'Your trades after round one added ' + sp(gap) + ' compared with simply holding. Keep judging each trade this way.' });
  if (cashPct > 20) tips.push({ s: '💤 ' + cashPct.toFixed(0) + '% of your money sat idle in cash', l: 'On average ' + cashPct.toFixed(0) + ' percent of your money sat in cash earning nothing. A low risk stock would have lifted your return.' });
  if (byPl.length && byPl[0].profit < 0) tips.push({ s: '📉 ' + byPl[0].sym + ' cost you ' + inr(-byPl[0].profit), l: byPl[0].name + ' was your biggest drag, losing ' + sp(byPl[0].profit) + '. A smaller position would have limited the damage.' });
  if (!S.missions.spread) tips.push({ s: '🧺 Never held 3 sectors at once', l: 'You never held three sectors at once. Spreading across sectors means one bad headline cannot sink the whole portfolio.' });
  if (f.fin < f.idx) tips.push({ s: '📊 Market ' + pct(f.iret) + ', you ' + pct(f.ret), l: 'The market index returned ' + f.iret.toFixed(1) + ' percent against your ' + f.ret.toFixed(1) + '. Simply matching the market would have beaten your picks.' });
  if (!top.owned) tips.push({ s: '🍀 Top stock ' + top.sym + ' ' + pct(top.ret) + ' was pure hindsight', l: 'With hindsight, the best performer was ' + top.name + ', which you never owned. Nobody can know that in advance, so treat it as luck, not a mistake.' });
  if (S.hints || S.shields) tips.push({ s: '🛡 ' + (S.hints + S.shields) + ' power-ups left unused', l: 'You finished with power-ups unused. The hedge shield is worth most on a scary headline.' });
  if (!tips.length) tips.push({ s: '🏆 Beat the market by ' + pct(f.ret - f.iret), l: 'You stayed invested, spread your money and beat the market. Try a higher risk style for a harder game.' });
  const facts = { startingCash: setup.budget, timeHorizon: ROUNDS + ' ' + period() + 's', riskStyle: RISK[setup.risk], finalValue: Math.round(f.fin), returnPct: +f.ret.toFixed(1),
    marketIndexReturnPct: +f.iret.toFixed(1), fixedDepositValue: Math.round(f.fd), valueIfFirstPortfolioWasJustHeld: Math.round(holdVal), averageCashPct: +cashPct.toFixed(0),
    tradesAfterFirstRound: L.trades, soldRightAfterCrash: S.panic, usedShortSelling: S.usedShort, rightMarketCalls: S.right + ' of ' + S.round, roundsPlayed: S.round + ' of ' + ROUNDS, analystHintsUnused: S.hints, hedgeShieldUnused: S.shields,
    everHeldThreeIndustries: S.missions.spread, profitByHolding: byPl, allInvestmentsOverTheGame: perf, headlinesInOrder: S.events.map(e => e.h) };
  return { tips, facts };
}
let sampleFn = null;
(async () => { try { if (window.claude && window.claude.use) sampleFn = await window.claude.use('sample'); } catch (e) {} if (sampleFn && S && S.phase === 'result' && !M) render(); })();
async function askCoach() {
  const game = S; game.ai = { state: 'loading', text: '' }; render();
  const prompt = 'You are the coach in Bullsy, a stock market learning game for students that uses virtual money and simulated prices. Using only the game data below, tell the player what they could have done differently to improve their return on investment. Write exactly 3 short bullet tips, each under 16 words, each containing one number from the data and naming the stock or sector involved. Plain text only, no markdown, one tip per line starting with a dash. This is a game, so do not give real-world investment advice.\n\nGame data (JSON):\n' + JSON.stringify(game.final.review.facts);
  try {
    const out = await sampleFn(prompt, { onText: ({ text }) => { game.ai.text = text; const el = $('#aiout'); if (el && S === game) el.textContent = text; } });
    game.ai = { state: 'done', text: out.text };
  } catch (e) {
    game.ai = { state: 'error', text: (e && e.text) || '', msg: e && e.code === 'not_granted' ? 'The AI coach needs your permission to run.' : e && e.code === 'rate_limited' ? 'The AI coach is busy. Try again in a minute.' : 'The AI coach could not answer this time.' };
  }
  if (S === game) render();
}

/* ================= Charts (SVG) ================= */
function chart(series, o) {
  const W = 600, H = 190, L = 6, Rr = 6, T = 14, B = 22;
  const all = series.flatMap(s => s.v); let lo = Math.min(...all), hi = Math.max(...all);
  if (hi === lo) { hi += 1; lo -= 1; } const pad = (hi - lo) * .08; lo -= pad; hi += pad;
  const n = Math.max(...series.map(s => s.v.length));
  const x = i => L + (W - L - Rr) * (n === 1 ? 0 : i / (n - 1)), y = v => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
  let out = `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${o.aria}">`;
  [0, .5, 1].forEach(f => { const yy = T + (H - T - B) * f; out += `<line x1="${L}" x2="${W - Rr}" y1="${yy}" y2="${yy}" stroke="var(--line)"/>`; });
  out += `<text x="${L}" y="${T - 3}" font-size="11" fill="var(--muted)">${inr(hi - pad)}</text><text x="${L}" y="${H - B + 13}" font-size="11" fill="var(--muted)">${inr(lo + pad)}</text>`;
  out += `<text x="${W - Rr}" y="${H - 4}" font-size="11" fill="var(--muted)" text-anchor="end">${o.end}</text>`;
  if (o.mark != null) { const mx = x(o.mark); out += `<line x1="${mx}" x2="${mx}" y1="${T}" y2="${H - B}" stroke="var(--muted)" stroke-dasharray="3 4"/><text x="${mx}" y="${H - 4}" font-size="11" fill="var(--muted)" text-anchor="middle">${o.markText}</text>`; }
  series.forEach(s => {
    const d = s.v.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(v).toFixed(1)).join(' ');
    out += `<path d="${d}" fill="none" stroke="${s.c}" stroke-width="${s.w || 2.5}" stroke-linejoin="round" stroke-linecap="round" ${s.dash ? 'stroke-dasharray="6 5"' : ''}/>`;
    const li = s.v.length - 1; out += `<circle cx="${x(li)}" cy="${y(s.v[li])}" r="4.5" fill="${s.c}"/>`;
  });
  return out + '</svg>';
}
function spark(a) {
  const v = a.hist.slice(-12), lo = Math.min(...v), hi = Math.max(...v), W = 56, H = 22;
  const pts = v.map((p, i) => (2 + (W - 4) * i / (v.length - 1)).toFixed(1) + ',' + (3 + (H - 6) * (1 - (p - lo) / ((hi - lo) || 1))).toFixed(1)).join(' ');
  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" aria-hidden="true"><polyline points="${pts}" fill="none" stroke="var(--${cls(v[v.length - 1] - v[0])})" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/></svg>`;
}
const SC = { W: 600, H: 230, L: 8, R: 8, T: 12, B: 22 };
let chartH = 230, chartCW = 0;
const inr2 = n => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });
const pct2 = n => (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
const RANGES = { '1w': 5, '2w': 10, all: 1e9, '1y': 1e9 };
/* ===== Older real daily history per stock (only sessions BEFORE 7 Sep 2026), from the team's downloaded NSE / Investing.com files.
   Row = [ISO date, open, high, low, close, volume]. a.days (7 Sep to 5 Oct 2026) is untouched; 1Y = these rows + a.days.
   A stock with no entry here has no genuine one-year data, and its 1Y view says DATA UNAVAILABLE. */
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const SNAP_YEAR = SNAPSHOT.split(' ').pop();
const histCache = {};
function olderDays(a) {
  if (histCache[a.sym] !== undefined) return histCache[a.sym];
  const raw = STOCK_HIST[a.sym]; let out = null;
  if (Array.isArray(raw) && raw.length) {
    const seen = new Set();
    out = raw.filter(r => r.length >= 5 && r.slice(1, 5).every(x => isFinite(x) && x > 0) && !seen.has(r[0]) && seen.add(r[0])).sort((x, y) => x[0] < y[0] ? -1 : 1)
      .map((r, i, R) => { const p = r[0].split('-'); return { d: +p[2] + ' ' + MON[p[1] - 1] + ' ' + p[0], o: r[1], h: r[2], l: r[3], c: r[4], v: r[5], chg: i ? (r[4] / R[i - 1][4] - 1) * 100 : null, old: true }; });
    if (!out.length) out = null;
  }
  return histCache[a.sym] = out;
}
const fullDate = p => p.old ? p.d : p.d + ' ' + SNAP_YEAR;
/* what is actually loaded for the range on screen, counted from the data itself */
function scDiag(a, P) {
  const lab = { '1d': '1D', '1w': '1W', '2w': '2W', all: '1M', '1y': '1Y' }[S.range];
  if (S.range === '1d') return lab + ': intraday path modelled from one real daily candle';
  const R = P.filter(p => !p.sim), g = P.length - R.length;
  if (!R.length) return lab + ': no real daily candles loaded for ' + a.sym;
  return `${lab}: ${R.length} real daily candle${R.length > 1 ? 's' : ''}, ${fullDate(R[0])} to ${fullDate(R[R.length - 1])}${g ? ` + ${g} game round${g > 1 ? 's' : ''}` : ''}`;
}
/* real days first, then one point per game round; the range buttons show the last 5, 10 or all sessions */
/* 1D view. The data set is daily, so the path inside a day is modelled: a seeded (repeatable) walk that starts at the day's open,
   ends at its close and touches its high and low exactly, sampled every 15 minutes of the NSE session (9:15 AM to 3:30 PM). */
function seeded(str) {
  let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  let a = h >>> 0;
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const clock = m => { const h = Math.floor(m / 60); return (h % 12 || 12) + ':' + String(m % 60).padStart(2, '0') + (h < 12 ? ' AM' : ' PM'); };
function intraday(a) {
  const real = a.days.length, n = a.hist.length, key = n + '|' + a.price;
  if (a._id && a._id.key === key) return a._id.P;
  const rnd = seeded(a.sym + '|' + n + '|' + (n === real ? a.days[real - 1].d : Math.round(a.price * 100)));
  const g = () => { let u = 0; while (!u) u = rnd(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd()); };
  let o, h, l, c, prev, day;
  if (n === real) { const d = a.days[real - 1]; o = d.o; h = d.h; l = d.l; c = d.c; prev = real > 1 ? a.days[real - 2].c : d.c / (1 + d.chg / 100); day = d.d + ' 2026'; }
  else { const sd = (a.vol19 || 1.2) / 100; c = a.price; prev = c / (1 + Math.abs(g()) * sd * (a.last < 0 ? -1 : 1)); o = prev * (1 + g() * sd * .35);
    h = Math.max(o, c) * (1 + Math.abs(g()) * sd * .45); l = Math.min(o, c) * (1 - Math.abs(g()) * sd * .45); day = 'Latest session'; }
  if (![o, h, l, c, prev].every(v => isFinite(v) && v > 0)) throw new Error('no intraday data');
  /* skeleton open -> high and low (at two seeded times) -> close, with small bridged noise between the knots, kept inside the day's range */
  const N = 25, iH = 2 + Math.floor(rnd() * (N - 3)); let iL = 2 + Math.floor(rnd() * (N - 3)); if (Math.abs(iL - iH) < 3) iL = iH + (iH < N / 2 ? 4 : -4);
  const knots = [[0, o], [iH, h], [iL, l], [N, c]].sort((x, y) => x[0] - y[0]), px = [], amp = (h - l) * .09;
  for (let k = 0; k < 3; k++) { const [i0, v0] = knots[k], [i1, v1] = knots[k + 1], len = i1 - i0, w = [0];
    for (let j = 1; j <= len; j++) w.push(w[j - 1] + g());
    for (let j = 0; j < len; j++) px[i0 + j] = j ? Math.min(h, Math.max(l, v0 + (v1 - v0) * j / len + (w[j] - w[len] * j / len) * amp)) : v0; }
  px[N] = c;
  const P = px.map((v, i) => { const op = i ? px[i - 1] : o; return { d: clock(555 + 15 * i), m: 555 + 15 * i, o: op, c: v, h: Math.max(op, v), l: Math.min(op, v), chg: (v / prev - 1) * 100, it: true, day, est: n !== real }; });
  a._id = { key, P }; return P;
}
/* ===== Zoom and pan: a window [Z.s, Z.e] (fractions of the points in the current range). The y-axis re-fits to what is visible. ===== */
const Z = { s: 0, e: 1, key: '', f: .5, raf: 0 }, ZMIN = 5;
const zoomed = () => Z.e - Z.s < .9995;
function zWin(n) {
  const k = S.sel + '|' + S.range; if (Z.key !== k) { Z.key = k; Z.s = 0; Z.e = 1; Z.f = .5; }
  if (n <= ZMIN) return [0, n];
  let i0 = Math.round(Z.s * n), i1 = Math.round(Z.e * n); if (i1 - i0 < ZMIN) { i1 = Math.min(n, i0 + ZMIN); i0 = i1 - ZMIN; }
  return [Math.max(0, i0), Math.min(n, i1)];
}
function scPts(a) { const P = scAll(a); if (!P.length) return P; const w = zWin(P.length); return P.slice(w[0], w[1]); }
function zSet(s0, e0) {
  const n = scAll(A(S.sel)).length || 1, minW = Math.min(1, ZMIN / n); let w = Math.max(minW, Math.min(1, e0 - s0));
  let c = s0 + (e0 - s0) / 2 - w / 2; if (e0 - s0 >= minW && e0 - s0 <= 1) c = s0; c = Math.max(0, Math.min(1 - w, c)); Z.s = c; Z.e = c + w; if (w > .9995) { Z.s = 0; Z.e = 1; }
}
function scRedraw() {
  const box = $('#sc'); if (!box || !S || S.phase !== 'play') return; S.anim = false;
  const t = document.createElement('div'); t.innerHTML = stockChart(A(S.sel));
  ['#sc', '#scdg', '#zc'].forEach(q => { const nw = t.querySelector(q), o = $(q); if (nw && o) o.innerHTML = nw.innerHTML; });
  box.classList.toggle('zm', zoomed());
}
/* f = where in the visible window (0 left .. 1 right) the zoom is anchored; factor < 1 zooms in */
function zoomAt(f, factor, smooth) {
  zWin(1e9); const w = Z.e - Z.s, anchor = Z.s + f * w, s0 = Z.s, e0 = Z.e; zSet(anchor - f * w * factor, anchor - f * w * factor + w * factor);
  if (!smooth) return scRedraw();
  const s1 = Z.s, e1 = Z.e, t0 = performance.now(); cancelAnimationFrame(Z.raf);
  const step = now => { const k = Math.min(1, (now - t0) / 200), q = 1 - Math.pow(1 - k, 3); Z.s = s0 + (s1 - s0) * q; Z.e = e0 + (e1 - e0) * q; scRedraw(); if (k < 1) Z.raf = requestAnimationFrame(step); };
  Z.s = s0; Z.e = e0; Z.raf = requestAnimationFrame(step);
}
function zoomBtn(v) { sfx.tap(); if (v === 'reset') { zWin(1e9); const w = Z.e - Z.s; return zoomAt(w >= 1 ? .5 : Z.s / (1 - w), 1 / w, true); } zoomAt(Z.f, v === 'in' ? .6 : 1 / .6, true); }
function scAll(a) {
  if (S.range === '1d') return intraday(a);
  const real = a.days.length;
  const P = a.days.concat(a.hist.slice(real).map((c, i) => { const o = a.hist[real + i - 1]; return { d: 'Round ' + (i + 1), o, c, h: Math.max(o, c), l: Math.min(o, c), chg: (c / o - 1) * 100, sim: true }; }));
  if (S.range === '1y') { const old = olderDays(a); return old ? old.concat(P) : []; }
  return P.slice(-RANGES[S.range]);
}
function scScale(P) {
  let lo = Math.min(...P.map(p => p.l)), hi = Math.max(...P.map(p => p.h)); const pad = (hi - lo) * .06 || 1; lo -= pad; hi += pad;
  const step = (SC.W - SC.L - SC.R) / P.length;
  return { lo, hi, step, x: i => SC.L + step * (i + .5), y: v => SC.T + (SC.H - SC.T - SC.B) * (1 - (v - lo) / (hi - lo)) };
}
function scRead(p) {
  if (p.it) return `<b>${p.d}</b> · Price <b class="num">${inr2(+p.c.toFixed(2))}</b> · Change <span class="num ${cls(p.chg)}">${pct2(p.chg)}</span> · ${p.day}, ${p.est ? 'simulated session' : 'intraday path modelled from the real open, high, low and close'}`;
  const vol = p.v ? ' · Vol ' + (p.v >= 1e7 ? (p.v / 1e7).toFixed(2) + ' Cr' : (p.v / 1e5).toFixed(1) + ' L') : '';
  return `<b>${p.d}${p.sim ? ' (game)' : ''}</b> · C <b class="num">${inr2(p.c)}</b> ${p.chg == null ? '' : `<span class="num ${cls(p.chg)}">${pct2(p.chg)}</span>`} · O ${inr2(p.o)} · H ${inr2(p.h)} · L ${inr2(p.l)}${vol}`;
}
function stockChart(a) {
  try { return stockChart0(a); }
  catch (e) { if (S.range !== '1d') throw e;
    const seg = (v, lab) => `<button data-range="${v}" aria-pressed="${S.range === v}">${lab}</button>`;
    return `<div class="tools"><div class="seg" role="group" aria-label="Time range">${seg('1d', '1D')}${seg('1w', '1W')}${seg('2w', '2W')}${seg('all', '1M')}${seg('1y', '1Y')}</div></div><div id="sc"><div class="empty" style="height:${chartH}px;display:grid;place-items:center">Intraday data unavailable</div></div><div id="scr" class="scr"></div>`; }
}
function stockChart0(a) {
  SC.W = Math.max(260, Math.round(SC.H * (chartCW || 600) / chartH));
  const seg = (k, v, lab) => `<button data-${k}="${v}" aria-pressed="${S[k === 'range' ? 'range' : 'chartMode'] === v}">${lab}</button>`;
  const tools = `<div class="tools"><div class="seg" role="group" aria-label="Time range">${seg('range', '1d', '1D')}${seg('range', '1w', '1W')}${seg('range', '2w', '2W')}${seg('range', 'all', '1M')}${seg('range', '1y', '1Y')}</div>
    <div class="seg zc" id="zc" role="group" aria-label="Zoom">${(() => { const nAll = scAll(a).length, w = (zWin(nAll || 1), Z.e - Z.s), z = zoomed(), min = nAll <= ZMIN || Math.round(w * nAll) <= ZMIN;
      return `<button data-zoom="out" title="Zoom out" aria-label="Zoom out" ${z ? '' : 'disabled'}>−</button><button data-zoom="in" title="Zoom in" aria-label="Zoom in" ${min ? 'disabled' : ''}>+</button><button data-zoom="reset" title="Reset view" aria-label="Reset view" ${z ? '' : 'disabled'}>Reset</button>`; })()}</div>
    <div class="seg" role="group" aria-label="Chart type">${seg('mode', 'line', 'Line')}${seg('mode', 'candles', 'Candles')}</div></div>`;
  const P0 = scPts(a);
  if (!P0.length) return `${tools}<div id="sc"><div class="empty scna" style="height:${chartH}px;display:grid;place-items:center;text-align:center"><div><b>DATA UNAVAILABLE</b><br><small>No genuine one-year price history is loaded for ${a.sym}</small></div></div></div><div id="scr" class="scr"></div><div id="scdg" class="scdg">${scDiag(a, P0)}</div>`;
  const PA = scAll(a), P = P0, sc = scScale(P), n = P.length, candles = S.chartMode === 'candles', bot = SC.H - SC.B, col = `var(--${cls(P[n - 1].c - P[0].o)})`;
  let s = `<svg class="chart" style="height:${chartH}px" preserveAspectRatio="none" viewBox="0 0 ${SC.W} ${SC.H}" role="img" aria-label="Price graph of ${a.name}">`;
  [0, .5, 1].forEach(f => { const yy = SC.T + (bot - SC.T) * f; s += `<line x1="${SC.L}" x2="${SC.W - SC.R}" y1="${yy}" y2="${yy}" stroke="var(--line)"/>`; });
  s += `<text x="${SC.W - SC.R}" y="${SC.T + 12}" font-size="11" fill="var(--muted)" text-anchor="end">${inr2(+sc.hi.toFixed(2))}</text><text x="${SC.W - SC.R}" y="${bot - 4}" font-size="11" fill="var(--muted)" text-anchor="end">${inr2(+sc.lo.toFixed(2))}</text>`;
  const fs = P.findIndex(p => p.sim);
  if (fs > 0) { const bx = SC.L + sc.step * fs; s += `<line x1="${bx}" x2="${bx}" y1="${SC.T}" y2="${bot}" stroke="var(--muted)" stroke-dasharray="3 4"/><text x="${bx > SC.W - SC.R - 80 ? SC.W - SC.R : bx + 4}" y="${SC.H - 5}" font-size="11" fill="var(--muted)" text-anchor="${bx > SC.W - SC.R - 80 ? 'end' : 'start'}">Game rounds</text>`; }
  if (candles) P.forEach((p, i) => { const x = sc.x(i), c = p.c >= p.o ? 'var(--up)' : 'var(--down)';
    s += `<line x1="${x}" x2="${x}" y1="${sc.y(p.h)}" y2="${sc.y(p.l)}" stroke="${c}" stroke-width="${Math.min(1.6, Math.max(.6, sc.step * .3)).toFixed(2)}"/><rect x="${x - sc.step * .3}" y="${sc.y(Math.max(p.o, p.c))}" width="${sc.step * .6}" height="${Math.max(1.5, Math.abs(sc.y(p.o) - sc.y(p.c)))}" rx="${sc.step < 6 ? 0 : 1.5}" fill="${c}"/>`; });
  else { const d = P.map((p, i) => (i ? 'L' : 'M') + sc.x(i).toFixed(1) + ' ' + sc.y(p.c).toFixed(1)).join(' ');
    s += `<path d="${d} L${sc.x(n - 1)} ${bot} L${sc.x(0)} ${bot} Z" fill="${col}" opacity=".1"/><path d="${d}" pathLength="1" class="${S.anim ? 'draw' : ''}" fill="none" stroke="${col}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>`; }
  s += `<circle cx="${sc.x(n - 1)}" cy="${sc.y(P[n - 1].c)}" r="4.5" fill="${col}"/>`;
  s += `<line id="scx" y1="${SC.T}" y2="${bot}" stroke="var(--muted)" visibility="hidden"/><circle id="scd" r="5" fill="var(--ink)" stroke="var(--card)" stroke-width="2" visibility="hidden"/>`;
  if (P[0].it && !zoomed()) { const ticks = SC.W >= 640 ? [555, 600, 660, 720, 780, 840, 900] : [555, 660, 780, 900];
    ticks.forEach((m, k) => { const i = (m - 555) / 15; s += `<line x1="${sc.x(i)}" x2="${sc.x(i)}" y1="${bot}" y2="${bot + 4}" stroke="var(--muted)"/><text x="${k ? sc.x(i) : SC.L}" y="${SC.H - 5}" font-size="11" fill="var(--muted)" text-anchor="${k ? 'middle' : 'start'}">${clock(m)}</text>`; }); s += '</svg>'; }
  else s += `<text x="${SC.L}" y="${SC.H - 5}" font-size="11" fill="var(--muted)">${P[0].d}</text>${fs < 0 ? `<text x="${SC.W - SC.R}" y="${SC.H - 5}" font-size="11" fill="var(--muted)" text-anchor="end">${P[n - 1].d}</text>` : ''}</svg>`;
  return `${tools}
    <div id="sc" class="${zoomed() ? 'zm' : ''}">${s}</div><div id="scr" class="scr">${scRead(P[n - 1])}</div><div id="scdg" class="scdg">${scDiag(a, PA)}${zoomed() ? ` · zoomed: ${P[0].d} to ${P[n - 1].d}` : ''}</div>`;
}
function scInspect(svg, clientX) {
  const P = scPts(A(S.sel)); if (!P.length) return; const sc = scScale(P), r = svg.getBoundingClientRect();
  const i = Math.max(0, Math.min(P.length - 1, Math.floor(((clientX - r.left) / r.width * SC.W - SC.L) / sc.step))), X = sc.x(i), l = $('#scx'), d = $('#scd');
  l.setAttribute('x1', X); l.setAttribute('x2', X); l.setAttribute('visibility', 'visible');
  d.setAttribute('cx', X); d.setAttribute('cy', sc.y(P[i].c)); d.setAttribute('visibility', 'visible');
  $('#scr').innerHTML = scRead(P[i]);
}
const ZP = new Map(); let zDrag = null, zPinch = null, zWheel = 0;
const scFrac = (svg, x) => { const r = svg.getBoundingClientRect(); return Math.max(0, Math.min(1, ((x - r.left) / r.width * SC.W - SC.L) / (SC.W - SC.L - SC.R))); };
const scBox = e => { const b = e.target.closest && e.target.closest('#sc'); return b && S && S.phase === 'play' && b.querySelector('svg') ? b : null; };
document.addEventListener('pointerdown', e => {
  const b = scBox(e); if (!b) return; const svg = b.querySelector('svg');
  ZP.set(e.pointerId, e.clientX); try { b.setPointerCapture(e.pointerId); } catch (x) {}
  zWin(1e9); cancelAnimationFrame(Z.raf);
  if (ZP.size === 2) { const xs = [...ZP.values()]; zPinch = { d: Math.max(20, Math.abs(xs[0] - xs[1])), s: Z.s, e: Z.e, f: scFrac(svg, (xs[0] + xs[1]) / 2) }; zDrag = null; }
  else { zDrag = { x: e.clientX, s: Z.s, e: Z.e, moved: false }; Z.f = scFrac(svg, e.clientX); scInspect(svg, e.clientX); }
});
document.addEventListener('pointermove', e => {
  const b = ZP.has(e.pointerId) ? $('#sc') : scBox(e); if (!b || !S || S.phase !== 'play') return; let svg = b.querySelector('svg'); if (!svg) return;
  if (ZP.has(e.pointerId)) ZP.set(e.pointerId, e.clientX);
  if (zPinch && ZP.size >= 2) { const xs = [...ZP.values()], d = Math.max(20, Math.abs(xs[0] - xs[1])), w = (zPinch.e - zPinch.s) * zPinch.d / d, an = zPinch.s + zPinch.f * (zPinch.e - zPinch.s);
    zSet(an - zPinch.f * w, an - zPinch.f * w + w); return scRedraw(); }
  if (zDrag && ZP.has(e.pointerId) && (zDrag.e - zDrag.s) < .9995) { const r = svg.getBoundingClientRect(), w = zDrag.e - zDrag.s, dx = (e.clientX - zDrag.x) / (r.width * (SC.W - SC.L - SC.R) / SC.W) * w;
    if (Math.abs(e.clientX - zDrag.x) > 3) zDrag.moved = true;
    if (zDrag.moved) { const s0 = Math.max(0, Math.min(1 - w, zDrag.s - dx)); Z.s = s0; Z.e = s0 + w; scRedraw(); svg = b.querySelector('svg'); b.classList.add('drag'); } }
  Z.f = scFrac(svg, e.clientX); scInspect(svg, e.clientX);
});
['pointerup', 'pointercancel'].forEach(t => document.addEventListener(t, e => { if (!ZP.has(e.pointerId)) return; ZP.delete(e.pointerId); zPinch = null; zDrag = null; const b = $('#sc'); if (b) b.classList.remove('drag');
  if (ZP.size === 1 && b && b.querySelector('svg')) { zWin(1e9); zDrag = { x: [...ZP.values()][0], s: Z.s, e: Z.e, moved: true }; } }));
document.addEventListener('wheel', e => {
  const b = scBox(e); if (!b) return; e.preventDefault(); const svg = b.querySelector('svg'); zWin(1e9); cancelAnimationFrame(Z.raf);
  const unit = e.deltaMode === 1 ? 16 : 1;
  if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !e.ctrlKey) { if (!zoomed()) return; const w = Z.e - Z.s, s0 = Math.max(0, Math.min(1 - w, Z.s + e.deltaX * unit / 600 * w)); Z.s = s0; Z.e = s0 + w; }
  else { const f = scFrac(svg, e.clientX), w = Z.e - Z.s, an = Z.s + f * w, k = Math.exp(Math.max(-60, Math.min(60, e.deltaY * unit)) * (e.ctrlKey ? .012 : .0028)); zSet(an - f * w * k, an - f * w * k + w * k); Z.f = f; }
  if (!zWheel) zWheel = requestAnimationFrame(() => { zWheel = 0; scRedraw(); const sv = $('#sc svg'); if (sv) scInspect(sv, e.clientX); });
}, { passive: false });

/* ================= Sector benchmark index =================
   Each sector maps to its own NSE index. The data is the team's downloaded daily files (7 Oct 2025 to 6 Oct 2026), embedded as the original CSV text
   and parsed once per sector on first use. NIFTY 50 (the 19 daily rows already in the game) is the default and the fallback. To add a sector, add one line to SECTOR_INDEX. */
const SECTOR_INDEX = {
  Banking: { name: 'NIFTY Bank', csv: 'NIFTY_BANK' },
  IT: { name: 'NIFTY IT', csv: 'NIFTY_IT' },
  Automobiles: { name: 'NIFTY Auto', csv: 'NIFTY_AUTO' },
  Pharma: { name: 'NIFTY Pharma', csv: 'NIFTY_PHARMA' },
  Energy: { name: 'NIFTY Energy', csv: 'NIFTY_ENERGY' }
};
const MONN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monIx = m => MONN.findIndex(x => x.toLowerCase() === String(m).slice(0, 3).toLowerCase());
const fmtD = t => { const d = new Date(t); return d.getUTCDate() + ' ' + MONN[d.getUTCMonth()] + ' ' + d.getUTCFullYear(); };
const f2 = v => v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
function parseIndexCsv(text) {
  const lines = String(text || '').replace(/^﻿/, '').split(/\r?\n/).filter(l => l.trim());
  const head = (lines[0] || '').split(',').map(h => h.trim().toLowerCase()), col = n => head.findIndex(h => h === n || h.startsWith(n + ' '));
  const ci = { d: col('date'), o: col('open'), h: col('high'), l: col('low'), c: col('close') };
  if (Object.values(ci).some(i => i < 0)) throw new Error('index file is missing a Date/Open/High/Low/Close column');
  const byDay = new Map(); let skipped = 0;
  lines.slice(1).forEach(ln => {
    const f = ln.split(','), m = /^(\d{1,2})-([A-Za-z]{3})-(\d{4})$/.exec((f[ci.d] || '').trim()), o = +f[ci.o], h = +f[ci.h], l = +f[ci.l], c = +f[ci.c];
    if (!m || monIx(m[2]) < 0 || ![o, h, l, c].every(v => isFinite(v) && v > 0) || h < l) { skipped++; return; }
    const t = Date.UTC(+m[3], monIx(m[2]), +m[1]); byDay.set(t, { t, o, h, l, c });
  });
  const rows = Array.from(byDay.values()).sort((a, b) => a.t - b.t);
  if (rows.length < 2) throw new Error('index file has no usable rows');
  return { rows, skipped };
}
const idxCache = {};
function nifty50() {
  if (!idxCache._n50) idxCache._n50 = { name: 'NIFTY 50', rows: NIFTY.map(d => { const p = d.d.split(' '); return { t: Date.UTC(2026, monIx(p[1]), +p[0]), o: d.o, h: d.h, l: d.l, c: d.c }; }), fallback: false };
  return idxCache._n50;
}
/* sector -> its index data; no sector -> NIFTY 50; a broken sector file -> NIFTY 50 flagged as a fallback, never another sector's data */
function indexFor(sector) {
  const def = SECTOR_INDEX[sector]; if (!def) return nifty50();
  if (!idxCache[sector]) {
    try { const p = parseIndexCsv(INDEX_CSV[def.csv]); idxCache[sector] = { name: def.name, rows: p.rows, skipped: p.skipped, fallback: false }; }
    catch (e) { idxCache[sector] = { name: def.name, rows: [], unavailable: true }; } /* never another index in its place */
  }
  return idxCache[sector];
}
/* The one place that links a stock to its benchmark: symbol -> sector (from the stock list) -> that sector's index.
   Everything that shows a benchmark for a stock calls getBenchmarkForStock. */
const STOCK_SECTOR = ASSETS.reduce((m, a) => { m[a.sym] = a.sector; m[a.id] = a.sector; return m; }, {});
/* per-stock exceptions to the sector rule */
const STOCK_BENCHMARK_OVERRIDE = { RELIANCE: nifty50, reliance: nifty50 };
function getBenchmarkForStock(symbol) { if (STOCK_BENCHMARK_OVERRIDE[symbol]) return STOCK_BENCHMARK_OVERRIDE[symbol](); const sector = STOCK_SECTOR[symbol]; return sector && SECTOR_INDEX[sector] ? indexFor(sector) : { name: (sector || 'Sector').toUpperCase(), rows: [], unavailable: true }; }
const benchLine = ix => ix.unavailable ? ix.name + ' · <span class="err">DATA UNAVAILABLE</span>' : (q => ix.name + ` <span class="${cls(q.chg)}">${arr(q.chg)} ${Math.abs(q.chg).toFixed(2)}%</span>`)(indexStat(ix));
/* latest close against the previous trading day's close */
function indexStat(ix) { const r = ix.rows, last = r[r.length - 1], prev = r[r.length - 2]; return { last, prev, pts: last.c - prev.c, chg: (last.c / prev.c - 1) * 100 }; }
const IDX_RANGES = [['1d', '1D'], ['1w', '1W'], ['2w', '2W'], ['1m', '1M'], ['1y', '1Y']];
function indexSlice(ix, range) {
  if (!ix.rows.length) return [];
  const r = ix.rows, end = r[r.length - 1].t, d = new Date(end);
  if (range === '1d') return r.slice(-1);
  if (range === '1w') d.setUTCDate(d.getUTCDate() - 7); else if (range === '2w') d.setUTCDate(d.getUTCDate() - 14);
  else if (range === '1m') d.setUTCMonth(d.getUTCMonth() - 1); else d.setUTCFullYear(d.getUTCFullYear() - 1);
  return r.filter(x => x.t > d.getTime());
}
const IndexCard = (() => {
  const cv = $('#nfc'), ctx = cv.getContext('2d'), still = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
  let ix = nifty50(), range = '1m', rows = indexSlice(ix, range), prog = 1, raf = 0, hover = -1, geo = null;
  function text() {
    $('#nfr').innerHTML = IDX_RANGES.map(r => `<button data-idx="${r[0]}" aria-pressed="${range === r[0]}">${r[1]}</button>`).join('');
    if (ix.unavailable) { $('#nfn').textContent = ix.name; $('#nfv').textContent = 'DATA UNAVAILABLE'; $('#nfv').classList.add('na'); $('#nfch').textContent = ''; $('#nfm').textContent = ''; const er = $('#nfe'); er.hidden = false; er.textContent = 'Benchmark data for this sector could not be read.'; return; }
    $('#nfv').classList.remove('na');
    const s = indexStat(ix), h = hover >= 0 ? rows[hover] : null;
    $('#nfn').textContent = ix.name;
    $('#nfv').textContent = f2(s.last.c);
    const e = $('#nfch'); e.textContent = arr(s.chg) + ' ' + f2(Math.abs(s.pts)) + ' (' + Math.abs(s.chg).toFixed(2) + '%)'; e.className = 'num ' + cls(s.chg);
    const m = $('#nfm');
    if (h) { const i = ix.rows.indexOf(h), pc = i > 0 ? ix.rows[i - 1].c : null; m.innerHTML = `<b>${fmtD(h.t)}</b> · C ${f2(h.c)}${pc ? ` <span class="${cls(h.c - pc)}">${pct2((h.c / pc - 1) * 100)}</span>` : ''} · O ${f2(h.o)} · H ${f2(h.h)} · L ${f2(h.l)}`; }
    else { const a = rows[0], b = rows[rows.length - 1], rc = (b.c / a.o - 1) * 100;
      m.innerHTML = range === '1d' ? `<b>${fmtD(b.t)}</b> · O ${f2(b.o)} · H ${f2(b.h)} · L ${f2(b.l)} · C ${f2(b.c)}`
        : `<b>${fmtD(a.t)} to ${fmtD(b.t)}</b> · ${rows.length} sessions · <span class="${cls(rc)}">${pct2(rc)}</span> over the period`; }
    const er = $('#nfe'); er.hidden = true; er.textContent = '';
    cv.setAttribute('aria-label', ix.name + ' daily chart, ' + fmtD(rows[0].t) + ' to ' + fmtD(rows[rows.length - 1].t));
  }
  function draw() {
    const cs = getComputedStyle(document.documentElement), col = n => cs.getPropertyValue(n).trim(), up = col('--up'), down = col('--down'), muted = col('--muted'), line = col('--line'), ink = col('--ink');
    const dpr = Math.min(2, window.devicePixelRatio || 1), W = cv.clientWidth, H = cv.clientHeight; if (!W || !H) return;
    if (cv.width !== Math.round(W * dpr) || cv.height !== Math.round(H * dpr)) { cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    if (!rows.length) { geo = null; ctx.fillStyle = muted; ctx.font = '600 12px "IBM Plex Sans", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('DATA UNAVAILABLE', W / 2, H / 2); ctx.textAlign = 'left'; return; }
    const n = rows.length, candles = n <= 24, L = 4, R = 58, T = 8, B = 18, step = (W - L - R) / n, x = i => L + step * (i + .5);
    const lo0 = Math.min(...rows.map(r => candles ? r.l : r.c)), hi0 = Math.max(...rows.map(r => candles ? r.h : r.c)), pad = (hi0 - lo0) * .08 || 1, lo = lo0 - pad, hi = hi0 + pad, y = v => T + (H - T - B) * (1 - (v - lo) / (hi - lo));
    geo = { L, step, n };
    const font = w => (w || '') + ' 10.5px "IBM Plex Sans", system-ui, sans-serif';
    ctx.lineWidth = 1; ctx.strokeStyle = line; ctx.font = font(); ctx.fillStyle = muted; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    [hi0, (hi0 + lo0) / 2, lo0].forEach(v => { const yy = Math.round(y(v)) + .5; ctx.beginPath(); ctx.moveTo(L, yy); ctx.lineTo(W - R, yy); ctx.stroke(); ctx.fillText(Math.round(v).toLocaleString('en-IN'), W - R + 6, yy); });
    const lastRow = rows[n - 1], trend = lastRow.c >= rows[0].o ? up : down;
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, L + (W - L - R) * prog, H); ctx.clip();
    if (candles) rows.forEach((r, i) => { const k = r.c >= r.o ? up : down, bw = Math.max(3, Math.min(46, step * .56));
      ctx.strokeStyle = k; ctx.fillStyle = k; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(x(i), y(r.h)); ctx.lineTo(x(i), y(r.l)); ctx.stroke();
      const y1 = y(Math.max(r.o, r.c)), y2 = y(Math.min(r.o, r.c)); ctx.fillRect(x(i) - bw / 2, y1, bw, Math.max(1.5, y2 - y1)); });
    if (n > 1) { ctx.beginPath(); rows.forEach((r, i) => i ? ctx.lineTo(x(i), y(r.c)) : ctx.moveTo(x(i), y(r.c)));
      if (!candles) { ctx.strokeStyle = trend; ctx.lineWidth = 1.8; ctx.lineJoin = 'round'; ctx.stroke(); ctx.lineTo(x(n - 1), H - B); ctx.lineTo(x(0), H - B); ctx.closePath(); ctx.globalAlpha = .1; ctx.fillStyle = trend; ctx.fill(); ctx.globalAlpha = 1; }
      else { ctx.strokeStyle = ink; ctx.globalAlpha = .45; ctx.lineWidth = 1.3; ctx.lineJoin = 'round'; ctx.stroke(); ctx.globalAlpha = 1; } }
    ctx.restore();
    const py = y(lastRow.c), k = lastRow.c >= lastRow.o ? up : down;
    ctx.setLineDash([3, 4]); ctx.strokeStyle = k; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(L, py); ctx.lineTo(W - R, py); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = k; ctx.fillRect(W - R + 2, py - 8, R - 2, 16); ctx.fillStyle = col('--on-sig'); ctx.font = font('600'); ctx.fillText(Math.round(lastRow.c).toLocaleString('en-IN'), W - R + 6, py);
    if (hover >= 0) { const hx = x(hover); ctx.strokeStyle = muted; ctx.beginPath(); ctx.moveTo(hx, T); ctx.lineTo(hx, H - B); ctx.stroke(); ctx.beginPath(); ctx.fillStyle = ink; ctx.arc(hx, y(rows[hover].c), 3.5, 0, 6.3); ctx.fill(); }
    ctx.fillStyle = muted; ctx.font = font(); ctx.textBaseline = 'alphabetic';
    const short = t => { const d = new Date(t); return d.getUTCDate() + ' ' + MONN[d.getUTCMonth()] + (range === '1y' ? ' ' + String(d.getUTCFullYear()).slice(2) : ''); };
    if (n === 1) { ctx.textAlign = 'center'; ctx.fillText(short(rows[0].t), x(0), H - 4); }
    else { ctx.textAlign = 'left'; ctx.fillText(short(rows[0].t), L, H - 4); ctx.textAlign = 'right'; ctx.fillText(short(lastRow.t), W - R, H - 4); }
    ctx.textAlign = 'left';
  }
  function go() {
    rows = indexSlice(ix, range); hover = -1; text(); cancelAnimationFrame(raf);
    if (still) { prog = 1; return draw(); }
    const t0 = performance.now(), stepFn = t => { prog = Math.min(1, Math.max(0, (t - t0) / 520)); draw(); if (prog < 1) raf = requestAnimationFrame(stepFn); };
    prog = 0; raf = requestAnimationFrame(stepFn);
  }
  cv.addEventListener('pointermove', e => { if (!geo) return; const r = cv.getBoundingClientRect(), i = Math.max(0, Math.min(geo.n - 1, Math.floor((e.clientX - r.left - geo.L) / geo.step))); if (i !== hover) { hover = i; text(); draw(); } });
  cv.addEventListener('pointerleave', () => { if (hover >= 0) { hover = -1; text(); draw(); } });
  window.addEventListener('resize', draw);
  new MutationObserver(draw).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  if (window.matchMedia) try { matchMedia('(prefers-color-scheme: dark)').addEventListener('change', draw); } catch (e) {}
  text();
  return { show(nx) { if (nx !== ix) { ix = nx; go(); } }, setRange(r) { if (IDX_RANGES.some(x => x[0] === r)) { range = r; go(); } }, redraw() { prog = Math.max(prog, still ? 1 : prog); draw(); }, state: () => ({ name: ix.name, range, n: rows.length, unavailable: !!ix.unavailable, last: rows.length ? rows[rows.length - 1].c : null }) };
})();

/* ================= Views ================= */
function ticker() {
  const list = S ? S.assets : ASSETS, n = NIFTY[NIFTY.length - 1], f2 = v => v.toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const it = (name, val, c) => `<span><b>${name}</b><span class="num">${val}</span> <span class="num t-${cls(c)}">${arr(c)} ${Math.abs(c).toFixed(2)}%</span></span>`;
  const one = it('NIFTY 50', f2(n.c), n.chg) + SECTORS.map(s => { const g = list.filter(a => a.sector === s); return it(s.toUpperCase(), '', g.reduce((t, a) => t + chg(a), 0) / g.length); }).join('') + list.map(a => it(a.sym, f2(+a.price.toFixed(2)), chg(a))).join('');
  return `<div class="run">${one}${one}</div>`;
}
function hud() {
  const dk = isDark(), snd = `<button class="ib" data-act="theme" title="Switch to ${dk ? 'Light' : 'Dark'} Mode" aria-label="${dk ? 'Dark' : 'Light'} mode is on. Switch to ${dk ? 'Light' : 'Dark'} Mode">${dk ? '🌙' : '☀️'}</button><button class="ib" data-act="mute" aria-label="${muted ? 'Turn sound and voice on' : 'Turn sound and voice off'}">${muted ? '🔇' : '🔊'}</button>`, lg = '<button class="logo" data-act="home" aria-label="Go to Bullsy home" title="Go to Bullsy home"><img src="' + BULL_MARK + '" alt="">Bullsy</button>';
  if (!S || atHome) return lg + snd;
  const lv = level(), into = lv >= LEVELS.length ? 100 : (S.xp % XP_STEP) / XP_STEP * 100, tv = total(), pl = tv - setup.budget;
  return `${lg}
    <div class="stat"><span>Cash</span><b class="num">${inr(Math.max(0, free()))}</b></div>
    <div class="stat"><span>Portfolio</span><b class="num">${inr(tv)}</b></div>
    <div class="stat"><span>P&amp;L</span><b class="num t-${cls(pl)}">${sinr(pl)}</b></div>
    <div class="stat"><span>Round</span><b class="num">${S.early ? S.round : Math.min(S.round + 1, ROUNDS)}/${ROUNDS}${S.streak ? ' 🔥' + S.streak : ''}</b></div>
    <div class="stat"><span>Lv ${lv} · ${LEVELS[lv - 1]}</span><div class="xp" role="progressbar" aria-label="XP" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(into)}"><i style="width:${into}%"></i></div></div>${snd}`;
}
function opt(group, val, label) { return `<button class="opt" data-set="${group}" data-val="${val}" aria-pressed="${String(setup[group]) === String(val)}">${label}</button>`; }
function row(x) {
  const c = chg(x), h = S && S.hold[x.id];
  return `<button class="rw" ${S ? `data-sel="${x.id}" aria-pressed="${x.id === S.sel}"` : 'disabled'}>${logo(x)}<span><span class="sy">${x.sym}${h ? `<span class="own ${h < 0 ? 'sh' : ''}">${h < 0 ? 'S' + -h : h}</span>` : ''}</span><span class="nm">${x.name}</span></span>${spark(x)}<span class="px num">${inr(x.price)}<small class="${cls(c)}">${arr(c)} ${Math.abs(c).toFixed(1)}%</small></span></button>`;
}
function tile(x, stack) {
  const c = chg(x), h = S && S.hold[x.id];
  if (stack) return `<button class="tl" title="${x.name}" data-sel="${x.id}" aria-pressed="${x.id === S.sel}"><span class="sy">${logo(x)}<span class="num ${cls(c)}">${arr(c)}${Math.abs(c).toFixed(1)}%</span>${h ? `<i class="hd0 ${h < 0 ? 'sh' : ''}" title="${h < 0 ? 'Short ' + -h : 'Hold ' + h}"></i>` : ''}</span><b class="nm2">${x.sym}</b><small class="num">${inr(x.price)}</small></button>`;
  return `<button class="tl" title="${x.name}" ${S ? `data-sel="${x.id}" aria-pressed="${x.id === S.sel}"` : 'disabled'}><span class="sy">${logo(x)}<b>${x.sym}</b>${h ? `<i class="hd0 ${h < 0 ? 'sh' : ''}" title="${h < 0 ? 'Short ' + -h : 'Hold ' + h}"></i>` : ''}</span><small class="num">${inr(x.price)}${stack ? '</small><small class="num">' : ' '}<span class="${cls(c)}">${arr(c)}${Math.abs(c).toFixed(1)}%</span></small></button>`;
}
/* the full 15-row list needs a tall screen; otherwise each sector becomes one row of three tiles so nothing scrolls */
const roomy = () => false, wide = () => window.innerWidth >= 980;
function watchList(list) {
  if (mtab === 'all' && !roomy()) return SECTORS.map(s => { const g = list.filter(x => x.sector === s), av = g.reduce((t, x) => t + chg(x), 0) / g.length;
    return `<div class="sec"><i style="background:${SECCOL[s]}"></i>${SECEMO[s]} ${s}<span class="num ${cls(av)}">${pct(av)}</span></div><div class="tiles">${g.map(x => tile(x)).join('')}</div>`; }).join('');
  if (mtab === 'all') return SECTORS.map(s => { const g = list.filter(x => x.sector === s), av = g.reduce((t, x) => t + chg(x), 0) / g.length;
    return `<div class="sec"><i style="background:${SECCOL[s]}"></i>${SECEMO[s]} ${s}<span class="num ${cls(av)}">${pct(av)}</span></div>${g.map(row).join('')}`; }).join('');
  const sorted = list.slice().sort((x, y) => chg(y) - chg(x));
  const g = mtab === 'gain' ? sorted.filter(x => chg(x) > 0).slice(0, 5) : mtab === 'lose' ? sorted.reverse().filter(x => chg(x) < 0).slice(0, 5) : list.filter(x => watch.has(x.id));
  return g.length ? g.map(row).join('') : `<div class="empty">${mtab === 'watch' ? 'Tap ☆ on a stock' : 'None today'}</div>`;
}
function marketStrip(list) {
  const t = (k, lab) => `<button data-mtab="${k}" aria-pressed="${mtab === k}">${lab}</button>`;
  let body;
  if (mtab === 'all') body = SECTORS.map(s => { const g = list.filter(x => x.sector === s), av = g.reduce((a, x) => a + chg(x), 0) / g.length;
    return `<div class="mg"><div class="sec"><i style="background:${SECCOL[s]}"></i>${SECEMO[s]} ${s}<span class="num ${cls(av)}">${pct(av)}</span></div><div class="tiles">${g.map(x => tile(x, true)).join('')}</div></div>`; }).join('');
  else { const sorted = list.slice().sort((x, y) => chg(y) - chg(x));
    const g = mtab === 'gain' ? sorted.filter(x => chg(x) > 0).slice(0, 6) : mtab === 'lose' ? sorted.reverse().filter(x => chg(x) < 0).slice(0, 6) : list.filter(x => watch.has(x.id)).slice(0, 8);
    body = `<div class="mg wide"><div class="sec">${mtab === 'gain' ? 'Top gainers' : mtab === 'lose' ? 'Top losers' : 'My watchlist'}</div>${g.length ? `<div class="tiles" style="grid-template-columns:repeat(${Math.max(6, g.length)},minmax(0,1fr))">${g.map(x => tile(x, true)).join('')}</div>` : `<div class="empty" style="padding:14px">${mtab === 'watch' ? 'Tap ☆ on a stock' : 'None this round'}</div>`}</div>`; }
  return `<div class="mbin"><div class="mbh"><h3>Market watch</h3><div class="seg" role="group" aria-label="Filter">${t('all', 'All')}${t('gain', '▲')}${t('lose', '▼')}${t('watch', '★')}</div></div><div class="mgs">${body}</div></div>`;
}
function marketCard(list) {
  const t = (k, lab) => `<button data-mtab="${k}" aria-pressed="${mtab === k}">${lab}</button>`;
  return `<div class="card"><div class="hd"><h3>Market watch</h3><span class="lab num">${benchLine(S ? getBenchmarkForStock(S.sel) : indexFor(setup.fav))}</span></div>
    <div class="pad" style="padding-block:8px"><div class="seg" role="group" aria-label="Filter">${t('all', 'All')}${t('gain', 'Gainers')}${t('lose', 'Losers')}${t('watch', '★')}</div></div>${watchList(list)}</div>`;
}
let introAnim = true, atHome = false; /* atHome: the home screen is showing while a game is kept in memory */
function viewSetup() {
  const enter = introAnim ? ' enter' : ''; introAnim = false;
  const presets = [25000, 100000, 500000], custom = !presets.includes(setup.budget);
  const bx = indexFor(setup.fav), bs = bx.unavailable ? null : indexStat(bx), bmk = `<div class="bmk num" id="bmk"><span>Benchmark</span><b>${bx.name}</b>${bs ? `<span>${f2(bs.last.c)}</span><span class="${cls(bs.chg)}">${arr(bs.chg)} ${Math.abs(bs.chg).toFixed(2)}%</span>` : '<span class="err">DATA UNAVAILABLE</span>'}</div>`;
  const sg = (g, items) => `<div class="sg" role="group" aria-label="${g}">${items.map(o => `<button data-set="${g}" data-val="${o[0]}" aria-pressed="${String(setup[g]) === String(o[0])}">${o[1]}</button>`).join('')}</div>`;
  return `<div class="start${enter}">
  <div class="hero"><img class="biglogo" src="${BULL_FULL}" alt="Bullsy. Trade, learn, grow."><h1>Read the news. <em>Make your move.</em></h1><p>${ROUNDS} rounds with 15 real Indian stocks and virtual money.</p>
    <ol class="how" aria-label="How a round works"><li><i>1</i><div><b>Hear the news</b><span>A headline opens every round.</span></div></li><li><i>2</i><div><b>Buy, sell or short</b><span>Trade the stocks you think will move.</span></div></li><li><i>3</i><div><b>Call rise or fall</b><span>Predict the market to close the round.</span></div></li></ol></div>
  <div class="pcol setup"><div class="card form">
    <div class="hd"><h3>Game setup</h3><span class="lab">${ROUNDS} rounds</span></div>
    <div class="frow"><span class="lab">Cash</span><div class="sg" role="group" aria-label="Starting cash">
      ${presets.map(v => `<button data-budget="${v}" aria-pressed="${setup.budget === v}">${inr(v)}</button>`).join('')}
      <label class="cus${custom ? ' on' : ''}"><span>₹</span><input id="budget" type="number" inputmode="numeric" min="5000" max="10000000" step="1000" placeholder="Custom" value="${custom && setup.budget ? setup.budget : ''}" aria-label="Custom amount in rupees"></label></div></div>
    <div class="ffoot">${setupErr ? `<p class="err">${setupErr}</p>` : ''}<button class="btn go" data-act="start">${S ? 'Start new game' : 'Start game'}</button><div class="gbtns"><button class="btn ghost vgbtn" data-act="uguide">📘 Quick user guide</button><button class="btn ghost vgbtn" data-act="guide">▶ 30-sec video</button></div>${S ? `<button class="btn ghost" data-act="resume">${S.phase === 'play' ? 'Resume game · round ' + (S.round + 1) + '/' + ROUNDS : 'Back to my report'}</button>` : ''}</div>
  </div></div></div>`;
}
function viewPlay() {
  const a = A(S.sel), have = S.hold[a.id] || 0, can = Math.max(0, Math.floor(free() / a.price)), ids = Object.keys(S.hold), c = chg(a), ready = ids.length || S.round, tv = total(), inv = tv - S.cash;
  const rows = ids.map(id => { const h = A(id), q = S.hold[id], val = q * h.price, pl = val - S.cost[id];
    return `<button class="hr" data-sel="${id}">${logo(h)}<span><b>${h.sym}</b><small class="num">${q < 0 ? 'Short ' + -q : q} @ ${inr(Math.abs(S.cost[id] / q))}</small></span><span class="r num ${cls(pl)}">${sinr(pl)}<small>${inr(Math.abs(val))}</small></span></button>`; }).join('');
  const nDone = Object.keys(MISSIONS).filter(k => S.missions[k]).length;
  return `<div class="zones" data-tab="${tab}">
  <section class="zone z-market" aria-label="${wide() ? 'Nifty 50' : 'Market'}">${wide() ? '' : marketCard(S.assets)}</section>
  <section class="zone z-chart" aria-label="Chart and trading">
    <div class="card">
      <div class="qh"><span class="cilink" data-info="${a.id}" role="button" tabindex="0" title="About ${a.name}">${logo(a, true)}</span><div><h2 class="cilink" data-info="${a.id}" role="button" tabindex="0" title="About ${a.name}">${a.name}</h2><div class="chips" style="margin-top:4px"><span class="chip">${SECEMO[a.sector]} ${a.sector}</span><span class="chip">${RISK[a.risk]} risk</span>${have ? `<span class="chip ${have > 0 ? 'up' : 'down'}">${have > 0 ? 'Hold ' + have : 'Short ' + -have}</span>` : ''}</div></div>
        <div class="pr"><b class="num">${inr2(+a.price.toFixed(2))}</b><span class="num ${cls(c)}">${arr(c)} ${Math.abs(c).toFixed(2)}%</span></div>
        <div class="qbtns"><button class="star ciBtn" data-act="info" aria-label="About ${a.name}" title="About ${a.name}">ⓘ Info</button><button class="star undo" data-act="undo" ${S.undo && S.undo[a.id] && S.undo[a.id].n ? '' : 'disabled'} title="Undo my ${a.sym} trades this round" aria-label="Undo my ${a.sym} trades this round">↺</button><button class="star" data-act="star" aria-pressed="${watch.has(a.id)}" aria-label="Watchlist">${watch.has(a.id) ? '★' : '☆'}</button></div></div>
      ${stockChart(a)}
      <div class="pad2">
        <div class="step"><button data-act="dec" aria-label="Less">−</button><input id="qty" type="number" inputmode="numeric" min="1" step="1" value="${S.qty}" aria-label="Quantity"><button data-act="inc" aria-label="More">+</button></div>
        <button class="btn ghost sm" data-act="max" ${can || have ? '' : 'disabled'}>Max ${have < 0 ? -have : can}</button>
        <span id="cost" class="num" style="font-weight:700">${inr(S.qty * a.price)}</span>
        <span style="margin-left:auto" class="row">
        ${have < 0 ? `<button class="btn buy" data-act="cover">Cover</button><button class="btn sell" data-act="short" ${can ? '' : 'disabled'}>Short more</button>`
          : `<button class="btn buy" data-act="buy" ${can ? '' : 'disabled'}>Buy</button>${have > 0 ? '<button class="btn sell" data-act="sell">Sell</button>' : `<button class="btn sell" data-act="short" ${can ? '' : 'disabled'}>Short</button>`}`}
        <button class="btn ghost sm" data-act="help" aria-label="What is a short?">?</button></span>
      </div>
    </div>
    <div class="card callbar"><span class="lab">${ready ? 'Round ' + (S.round + 1) + ' call' : 'Trade first'}</span>
      <button class="btn buy call" data-act="up" ${ready ? '' : 'disabled'}>▲ Rise</button><button class="btn sell call" data-act="down" ${ready ? '' : 'disabled'}>▼ Fall</button>
      <button class="btn ghost sm" data-act="hint" ${S.hints && !S.hintOn ? '' : 'disabled'} title="Explains the headline">🔮 <span class="tx">Hint · </span>${S.hints}</button><button class="btn ghost sm" data-act="shield" ${S.shields && !S.shieldOn ? '' : 'disabled'} title="Pays back half of this round's loss">🛡 ${S.shieldOn ? 'On' : '<span class="tx">Shield · </span>' + S.shields}</button></div>
  </section>
  <section class="zone z-port" aria-label="Portfolio">
    <div class="card"><div class="hd"><h3>My portfolio</h3><span class="lab">${ids.length} held</span></div>
      <div class="tiles"><div><span class="lab">Invested</span><b class="num">${inr(Math.abs(inv))}</b></div><div><span class="lab">Free cash</span><b class="num">${inr(Math.max(0, free()))}</b></div></div>
      ${rows || '<div class="empty">No holdings yet</div>'}
      ${S.round ? '<div class="pad" style="padding-bottom:4px">' + chart([{ v: S.iHist, c: 'var(--muted)', dash: 1, w: 2 }, { v: S.vHist, c: 'var(--accent)', w: 3 }], { aria: 'Your net worth against the market index', end: 'Now' }) + '</div><div class="legend"><span><i style="background:var(--accent)"></i>You</span><span><i style="background:var(--muted)"></i>Index</span></div>' : ''}
    </div>
    <div class="card"><div class="hd"><h3>Missions</h3><span class="lab">${nDone}/6 · +100 XP</span></div>
      ${Object.keys(MISSIONS).map(k => `<div class="ms ${S.missions[k] ? 'done' : ''}"><i>${S.missions[k] ? '✓' : ''}</i><b>${MISSIONS[k].n}</b><span>${MISSIONS[k].d}</span></div>`).join('')}</div>
  </section></div>`;
}
function viewResult() {
  const f = S.final, lv = level();
  const badges = Object.keys(MISSIONS).map(k => [MISSIONS[k].n, MISSIONS[k].d, S.missions[k]])
    .concat([['Beat the bank', 'Beat a 6.5% deposit', f.fin > f.fd]]);
  const E = S.early, n = S.round;
  const early = E ? `<div class="card endearly" role="status"><b>Game Ended Early ⚠️</b><p>${n ? `You completed ${n} out of ${ROUNDS} rounds. Here’s what your decisions tell us so far.` : `You ended the game before finishing round 1 of ${ROUNDS}. Here’s what your decisions tell us so far.`}</p><small class="muted">Only the rounds you played are counted. Nothing has been filled in for the rest.</small></div>` : '';
  const cta = `<div class="card advcta"><b>${E ? 'Want to play the full game?' : 'Ready to beat your last score?'}</b><div class="row"><button class="btn" data-act="again">🚀 Play Again</button><button class="btn ghost" data-act="reset">🏠 Home</button></div></div>`;
  return `<div class="col">
  ${E ? early + advisorCard() : ''}
  <div class="card rank"><span class="lab">${E ? `Ended early · ${n} of ${ROUNDS} ${period()}s` : `After ${ROUNDS} ${period()}s`}</span><h1>${f.title}</h1>
    <div class="chips" style="justify-content:center"><span class="chip">Score <b class="num">${f.score.toLocaleString('en-IN')}</b></span><span class="chip">Lv ${lv} ${LEVELS[lv - 1]}</span>${f.bestLine ? `<span class="chip">${f.bestLine}</span>` : ''}</div><p class="muted">${f.line}</p></div>
  <div class="stats">
    <div class="card"><span class="lab">Start</span><b class="num">${inr(setup.budget)}</b></div>
    <div class="card"><span class="lab">You</span><b class="num ${cls(f.ret)}">${inr(f.fin)}</b><span class="num ${cls(f.ret)}">${pct(f.ret)}</span></div>
    <div class="card"><span class="lab">Index</span><b class="num">${inr(f.idx)}</b><span class="num ${cls(f.iret)}">${pct(f.iret)}</span></div>
    <div class="card"><span class="lab">Fixed deposit</span><b class="num">${inr(f.fd)}</b></div>
    <div class="card"><span class="lab">Right calls</span><b class="num">${S.right}/${E ? n : ROUNDS}</b></div>
    <div class="card"><span class="lab">Profit / loss</span><b class="num ${cls(f.fin - setup.budget)}">${sinr(f.fin - setup.budget)}</b></div>
  </div>
  <div class="card"><div class="pad" style="padding-bottom:4px">${chart([{ v: S.fHist, c: 'var(--up)', dash: 1, w: 2 }, { v: S.iHist, c: 'var(--muted)', dash: 1, w: 2 }, { v: S.vHist, c: 'var(--accent)', w: 3.5 }], { aria: 'Your net worth against the market index and a fixed deposit', end: E ? 'Quit' : 'End', mark: S.crashAt + 1 <= n ? S.crashAt + 1 : null, markText: 'Crash' })}</div>
    <div class="legend"><span><i style="background:var(--accent)"></i>You</span><span><i style="background:var(--muted)"></i>Index</span><span><i style="background:var(--up)"></i>Fixed deposit</span></div></div>
  <div class="card"><div class="hd"><h3>Badges</h3><span class="lab">${badges.filter(b => b[2]).length}/${badges.length}</span></div><div class="pad badges">${badges.map(b => `<div class="badge ${b[2] ? 'won' : ''}"><b>${b[2] ? '🏅 ' : ''}${b[0]}</b><span>${b[1]}</span></div>`).join('')}</div></div>
  ${E ? '' : advisorCard()}
  ${cta}</div>`;
}
/* stretch or shrink the price chart so the chart column exactly fills the screen height */
function fitChart(pass) {
  const z = $('.z-chart'), sc = $('#sc'); if (!z || !sc || !z.clientHeight || !z.children.length) return;
  const kids = z.children, used = kids[kids.length - 1].getBoundingClientRect().bottom - kids[0].getBoundingClientRect().top;
  const h = Math.round(Math.max(90, Math.min(520, chartH + z.clientHeight - used - 1))), cw = sc.clientWidth - 24;
  if (Math.abs(h - chartH) > 3 || Math.abs(cw - chartCW) > 3) { chartH = h; chartCW = cw; if ((pass || 0) < 2) render(pass ? 2 : 1); }
}
let tickKey = '';
function render(pass) {
  $('#hud').innerHTML = hud();
  const playing = !!S && S.phase === 'play' && !atHome;
  if (!playing && typeof ciOpen !== 'undefined' && ciOpen) closeInfo();
  const NF = $('#nifty'), MB = $('#mband');
  if (NF.parentNode !== document.body) document.body.insertBefore(NF, MB);
  $('#app').innerHTML = !S || atHome ? viewSetup() : playing ? viewPlay() : viewResult();
  MB.hidden = !(playing && wide()); MB.innerHTML = MB.hidden ? '' : marketStrip(S.assets);
  if (playing && wide()) { $('.z-market').appendChild(NF); IndexCard.show(getBenchmarkForStock(S.sel)); IndexCard.redraw(); }
  if (S && S.ai && S.ai.text) { const o = $('#aiout'); if (o) o.textContent = S.ai.text; }
  $('#fab').hidden = !playing; $('#quit').hidden = !playing; const tb = $('#tabs'); tb.hidden = !playing;
  if (playing) tb.innerHTML = [['market', '📋', 'Market'], ['chart', '📈', 'Chart'], ['port', '💼', 'Portfolio']].map(t => `<button data-tab="${t[0]}" aria-pressed="${tab === t[0]}"><b aria-hidden="true">${t[1]}</b>${t[2]}</button>`).join('');
  document.body.classList.toggle('playing', playing);
  if (playing) fitChart(pass);
  if (S) S.anim = false;
  Voice.paint();
}

/* ================= Input ================= */
function readBudget() { const i = $('#budget'); if (i && i.value) setup.budget = Math.floor(+i.value || 0); }
function setQty(q) { S.qty = Math.max(1, Math.floor(q)); const i = $('#qty'); if (i) i.value = S.qty; $('#cost').textContent = inr(S.qty * A(S.sel).price); }
document.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b || b.disabled) return;
  const d = b.dataset;
  if (d.set) { readBudget(); setup[d.set] = d.set === 'risk' ? +d.val : d.val; sfx.tap(); return render(); }
  if (d.budget) { setup.budget = +d.budget; sfx.tap(); return render(); }
  if (d.act === 'ciclose') return closeInfo();
  if (d.act === 'info') { sfx.tap(); return openInfo(S.sel); }
  if (d.sel) { S.sel = d.sel; S.qty = 1; S.anim = true; tab = 'chart'; sfx.tap(); render(); return openInfo(d.sel); }
  if (d.tab) { tab = d.tab; sfx.tap(); render(); return ($('#wrap').scrollTop = 0); }
  if (d.mtab) { mtab = d.mtab; sfx.tap(); return render(); }
  if (d.idx) { sfx.tap(); return IndexCard.setRange(d.idx); }
  if (d.zoom) return zoomBtn(d.zoom);
  if (d.range) { S.range = d.range; S.anim = true; sfx.tap(); return render(); }
  if (d.mode) { S.chartMode = d.mode; S.anim = true; sfx.tap(); return render(); }
  switch (d.act) {
    case 'home': if (!S || atHome) return; atHome = true; introAnim = true; Voice.stop(); sfx.tap(); render(); return ($('#wrap').scrollTop = 0);
    case 'resume': atHome = false; sfx.tap(); return render();
    case 'theme': toggleTheme(); $('#hud').innerHTML = hud(); return;
    case 'mute': muted = !muted; store.set('bullsy-muted', muted ? '1' : '0'); if (muted) Voice.stop(); else if (M) Voice.speak(M.script); $('#hud').innerHTML = hud(); return Voice.paint();
    case 'v-replay': if (M) { if (muted) toast('Sound is off'); Voice.speak(M.script); } return;
    case 'v-pause': return Voice.toggle();
    case 'm-close': return closeModal();
    case 'news': return openNews();
    case 'quit': M = { script: '' }; Voice.stop();
      $('#mcard').innerHTML = `<div class="mtop calm">Quit game?<span>Round ${S.round + 1}/${ROUNDS}</span></div><div class="mbody"><div class="mico" aria-hidden="true">🚪</div><h2 class="mhead calm" id="mhead">End this game now?</h2><p class="oneline muted">${S.round ? `You have played ${S.round} of ${ROUNDS} rounds.` : 'You have not finished a round yet.'} Your AI Advisor will review everything you did so far.</p></div><div class="mctl"><button class="btn ghost" id="mgo" data-act="m-close">Keep playing</button><button class="btn quit" data-act="quit-yes">End game &amp; see feedback</button></div>`;
      $('#modal').hidden = false; return $('#mgo').focus();
    case 'quit-yes': return endEarly();
    case 'start': readBudget();
      if (!(setup.budget >= 5000 && setup.budget <= 10000000)) { setupErr = 'Enter ₹5,000 to ₹1,00,00,000'; return render(); }
      setupErr = ''; sfx.up(); return newGame();
    case 'dec': return setQty(S.qty - 1);
    case 'inc': return setQty(S.qty + 1);
    case 'max': { const hv = S.hold[S.sel] || 0; return setQty(Math.max(1, hv < 0 ? -hv : Math.floor(free() / A(S.sel).price))); }
    case 'buy': return buy();
    case 'sell': return sell();
    case 'short': return shortSell();
    case 'cover': return cover();
    case 'help': return toast('Short = bet on a fall. Cover closes it.');
    case 'star': watch.has(S.sel) ? watch.delete(S.sel) : watch.add(S.sel); sfx.tap(); return render();
    case 'up': case 'down': return advance(d.act);
    case 'hint': if (!S.hints || S.hintOn) return; S.hints--; S.hintOn = true; sfx.tap(); render(); return openNews();
    case 'shield': S.shields--; S.shieldOn = true; sfx.tap(); toast('🛡 Shield on this round'); return render();
    case 'coach': if (sampleFn) askCoach(); return;
    case 'coach-voice': return openCoach();
    case 'ai-voice': return openModal({ kicker: 'AI coach', calm: true, html: `<div class="mico" aria-hidden="true">✨</div><h2 class="mhead calm" id="mhead">Your personal tips</h2>`, script: S.ai.text, cta: 'Done' });
    case 'undo': if (S && S.phase === 'play') { undoStock(S.sel); render(); } return;
    case 'guide': { Voice.stop(); sfx.tap(); const o = document.createElement('div'); o.id = 'vguide'; o.setAttribute('role', 'dialog'); o.setAttribute('aria-label', 'How to play Bullsy, 30 second video guide');
      o.innerHTML = `<div class="vgcard"><div class="vghd"><b>How to play Bullsy · 30 sec</b><button class="mx" data-act="guide-close" aria-label="Close video">✕</button></div><video controls autoplay muted playsinline preload="auto"><source src="guide.webm" type="video/webm"><source src="guide.mp4" type="video/mp4"></video><div class="vgft"><button class="btn" data-act="guide-close">Got it, let’s play</button></div></div>`;
      o.addEventListener('click', e => { if (e.target === o) o.remove(); }); document.body.appendChild(o); o.querySelector('.mx').focus(); return; }
    case 'uguide': sfx.tap(); return ugOpen();
    case 'ug-next': ugStep = Math.min(UGUIDE.length - 1, ugStep + 1); sfx.tap(); return ugPaint();
    case 'ug-prev': ugStep = Math.max(0, ugStep - 1); sfx.tap(); return ugPaint();
    case 'ug-close': { const o = document.getElementById('uguide'); if (o) o.remove(); return; }
    case 'ug-start': { const o = document.getElementById('uguide'); if (o) o.remove(); const b = document.querySelector('.ffoot [data-act=start]'); if (b) b.click(); return; }
    case 'guide-close': { const o = document.getElementById('vguide'); if (o) o.remove(); return; }
    case 'again': return newGame();
    case 'adv-voice': { const v = S.final && S.final.adv; if (v) { if (muted) toast('Sound is off'); Voice.speak((S.early ? 'You ended the game early, after ' + S.early.played + ' of ' + ROUNDS + ' rounds. ' : '') + 'Your trading score is ' + v.score + ' out of 100. ' + v.persona.replace(/^\S+\s/, '') + ' What you did well. ' + v.good.join(' ') + ' Where you can improve. ' + v.bad.join(' ') + ' Next game tip. ' + v.next[0]); } return; }
    case 'reset': clearResult(); atHome = false; S = null; introAnim = true; render(); return ($('#wrap').scrollTop = 0);
  }
});
document.addEventListener('input', e => {
  if (e.target.id === 'qty') { S.qty = Math.max(0, Math.floor(+e.target.value || 0)); $('#cost').textContent = inr(S.qty * A(S.sel).price); }
  if (e.target.id === 'budget') { setup.budget = Math.floor(+e.target.value || 0); const c = e.target.closest('.cus'); c.classList.add('on'); c.parentNode.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false')); }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && M) closeModal(); });
window.addEventListener('pagehide', () => Voice.stop());
let rz = 0; window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => { if (S && S.phase === 'play' && !M) render(); }, 150); });
try { const sv = sessionStorage.getItem('bullsy-result'), g = sv && JSON.parse(sv);
  if (g && g.S && g.S.phase === 'result' && g.S.final && Array.isArray(g.S.assets)) { S = g.S; if (g.setup) Object.assign(setup, g.setup); }
} catch (e) { S = null; clearResult(); }
render();
