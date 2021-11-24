import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgEthereumLine(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 32" height={props.size} width={props.size}>
	  <Path id="icons8-ethereum" d="M19.736.986a.583.583,0,0,0-.516.33L11.1,14.079a.584.584,0,0,0-.036.061h0q-.013.026-.023.052a.591.591,0,0,0-.039.229s0,0,0,0q0,.029,0,.057l0,.011a.583.583,0,0,0,.02.085l0,.016h0q.009.027.022.054h0q.012.026.027.05s0,0,0,0q.015.025.032.048l.017.02.02.025q.019.021.04.041h0a.584.584,0,0,0,.092.068h0l.009,0h0l8.088,4.622a.583.583,0,0,0,.72,0l8.081-4.619.013-.007.038-.024.011-.008.008-.007.035-.026,0,0,.007-.006q.018-.017.035-.035t.038-.044q.017-.023.032-.047h0v0q.015-.023.027-.047h0q.01-.02.018-.041l0-.013,0-.014q.006-.02.011-.04v-.006q.006-.027.01-.054t.006-.044s0,0,0,0q0-.027,0-.054t0-.034q0-.018,0-.036h0v-.006q0-.025-.01-.049s0,0,0,0-.008-.029-.013-.043l0-.013-.006-.014q-.007-.02-.016-.039h0v0q-.013-.025-.027-.048l0-.006,0,0-.018-.027L20.268,1.313a.583.583,0,0,0-.532-.327ZM19.162,3.58v6.94l-6.073,2.6Zm1.166,0L26.4,13.123l-6.073-2.6Zm-1.166,8.209v6.273L12.89,14.479Zm1.166,0,6.272,2.69-6.272,3.584Zm7.584,4.945a.583.583,0,0,0-.294.077l-7.873,4.5-7.873-4.5a.583.583,0,0,0-.758.853L19.237,28.69a.583.583,0,0,0,1.015,0l8.125-11.026a.583.583,0,0,0-.465-.93Zm-14.223,2.46,5.473,3.128v4.3Zm12.111,0-5.473,7.428v-4.3Z" transform="translate(-7, 2)" fill={props.color}/>
    </Svg>

  );
}

export default SvgEthereumLine;
