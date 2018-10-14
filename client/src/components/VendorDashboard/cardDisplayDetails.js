import React from 'react'
import {Select, Input, Menu, Dropdown} from 'semantic-ui-react'

const options = [
    {key: '', text: '', value: ''},
    {key: '01', value: 'JAN', text: '01'},
    {key: '02', value: 'FEB', text: '02'},
    {key: '03', value: 'MARCH', text: '03'},
    {key: '04', value: 'APRIL', text: '04'},
    {key: '05', value: 'MAY', text: '05'},
    {key: '06', value: 'JUNE', text: '06'},
    {key: '07', value: 'JULY', text: '07'},
    {key: '08', value: 'AUG', text: '08'},
    {key: '09', value: 'SEPT', text: '09'},
    {key: '10', value: 'OCT', text: '10'},
    {key: '11', value: 'NOV', text: '11'},
    {key: '12', value: 'DEC', text: '12'}
]


const options2 = [
    {key: '', text: '', value: ''},
    {key: '2018', value: '2018', text: '2018'},
    {key: '2019', value: '2019', text: '2019'},
    {key: '2020', value: '2020', text: '2020'},
    {key: '2021', value: '2021', text: '2021'},
    {key: '2022', value: '2022', text: '2022'},
    {key: '2023', value: '2023', text: '2023'},
    {key: '2024', value: '2024', text: '2024'},
    {key: '2025', value: '2025', text: '2025'},
    {key: '2026', value: '2026', text: '2026'},
    {key: '2027', value: '2027', text: '2027'},
    {key: '2028', value: '2028', text: '2028'}
]

const CardDisplayDetails = () => (
    <Input icon='credit-card' size='small' type='text' placeholder='XXXXXXXXXXXX5100' action>
        <input/>
        <Select style={{paddingRight: '35px'}} compact options={options} defaultValue='JAN'/>
        <Select style={{paddingRight: '45px'}} compact options={options2} defaultValue='2021'/>
    </Input>
)


export default CardDisplayDetails;


/*
****************************************************
~ Additional Expiration Dates for future use


key: 'value: '2029', text: '2029'
key: 'value: '2030', text: '2030'
key: 'value: '2031', text: '2031'
key: 'value: '2032', text: '2032'
key: 'value: '2033', text: '2033'
key: 'value: '2034', text: '2034'
key: 'value: '2035', text: '2035'
key: 'value: '2036', text: '2036'
key: 'value: '2037', text: '2037'
key: 'value: '2038', text: '2038'
key: 'value: '2039', text: '2039'
key: 'value: '2040', text: '2040'
key: 'value: '2041', text: '2041'
key: 'value: '2042', text: '2042'
key: 'value: '2043', text: '2043'
key: 'value: '2044', text: '2044'
key: 'value: '2045', text: '2045'
key: 'value: '2046', text: '2046'
key: 'value: '2047', text: '2047'
key: 'value: '2048', text: '2048'
key: 'value: '2049', text: '2049'
key: 'value: '2050', text: '2050'
key: 'value: '2051', text: '2051'
key: 'value: '2052', text: '2052'
key: 'value: '2053', text: '2053'
key: 'value: '2054', text: '2054'
key: 'value: '2055', text: '2055'
key: 'value: '2056', text: '2056'
key: 'value: '2057', text: '2057'
key: 'value: '2058', text: '2058'
key: 'value: '2059', text: '2059'
key: 'value: '2060', text: '2060'
key: 'value: '2061', text: '2061'
key: 'value: '2062', text: '2062'
key: 'value: '2063', text: '2063'
key: 'value: '2064', text: '2064'
key: 'value: '2065', text: '2065'
key: 'value: '2066', text: '2066'
key: 'value: '2067', text: '2067'
key: 'value: '2068', text: '2068'
key: 'value: '2069', text: '2069'
key: 'value: '2070', text: '2070'
key: 'value: '2071', text: '2071'
key: 'value: '2072', text: '2072'
key: 'value: '2073', text: '2073'
key: 'value: '2074', text: '2074'
key: 'value: '2075', text: '2075'
key: 'value: '2076', text: '2076'
key: 'value: '2077', text: '2077'
key: 'value: '2078', text: '2078'
key: 'value: '2079', text: '2079'
key: 'value: '2080', text: '2080'
key: 'value: '2081', text: '2081'
key: 'value: '2082', text: '2082'
key: 'value: '2083', text: '2083'
key: 'value: '2084', text: '2084'
key: 'value: '2085', text: '2085'
key: 'value: '2086', text: '2086'
key: 'value: '2087', text: '2087'
key: 'value: '2088', text: '2088'
key: 'value: '2089', text: '2089'
key: 'value: '2090', text: '2090'
key: 'value: '2091', text: '2091'
key: 'value: '2092', text: '2092'
key: 'value: '2093', text: '2093'
key: 'value: '2094', text: '2094'
key: 'value: '2095', text: '2095'
key: 'value: '2096', text: '2096'
key: 'value: '2097', text: '2097'
key: 'value: '2098', text: '2098'
key: 'value: '2099', text: '2099'
key: 'value: '2100', text: '2100'
key: 'value: '2101', text: '2101'
key: 'value: '2102', text: '2102'
key: 'value: '2103', text: '2103'
key: 'value: '2104', text: '2104'
key: 'value: '2105', text: '2105'
key: 'value: '2106', text: '2106'
key: 'value: '2107', text: '2107'
key: 'value: '2108', text: '2108'
key: 'value: '2109', text: '2109'
key: 'value: '2110', text: '2110'
key: 'value: '2111', text: '2111'
key: 'value: '2112', text: '2112'
key: 'value: '2113', text: '2113'
key: 'value: '2114', text: '2114'
key: 'value: '2115', text: '2115'
key: 'value: '2116', text: '2116'
key: 'value: '2117', text: '2117'
key: 'value: '2118', text: '2118'
]
*/
























