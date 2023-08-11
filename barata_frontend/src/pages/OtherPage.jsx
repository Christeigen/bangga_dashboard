import Example from "/src/components/chart/kpi";
import MyBarChart from "/src/components/chart/bar";
import BarChart from "/src/components/chart/BarSen";
import { useOutletContext } from "react-router-dom";
import {
  Card,
  Grid,
  Title,
  Text,
  Tab,
  TabList,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@tremor/react";

export default function OtherPage() {

  const [ bookData ] = useOutletContext()

  return (
    <Grid numItemsMd={2} numItemsLg={1} className="gap-6 mt-6">
    <div className="flex gap-5 mx-2">
      <Example/>
    </div>
    <div>
      <senBarChart source = {bookData}/>
    </div>
    </Grid>
  )
}
