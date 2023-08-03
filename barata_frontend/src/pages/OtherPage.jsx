import Map from "/src/components/chart/Map";
import { useOutletContext } from "react-router-dom";

export default function OtherPage() {

  const [ bookData, chargingstationData, userData ] = useOutletContext()

  return (
    <div className="flex gap-5 mx-2">
      <Map source = {chargingstationData}/>

    </div>
  )
}
