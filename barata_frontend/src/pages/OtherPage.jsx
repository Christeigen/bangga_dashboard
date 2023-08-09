import Example from "/src/components/widget/kpi";
import { useOutletContext } from "react-router-dom";

export default function OtherPage() {

  const [ bookData, chargingstationData, userData ] = useOutletContext()

  return (
    <div className="flex gap-5 mx-2">
      <Example/>

    </div>
  )
}
