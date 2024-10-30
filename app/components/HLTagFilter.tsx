import * as React from "react"
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

//  AIT Advanced Individual Training
//  RTI Regional Training Institute
//  EDI European Defense Initiative
//  NCR National Capitol Region
//  AT Annual Training

interface SelectH1TagProps {
  onValueChange: (value: string) => void;
}

export function SelectHLTag({ onValueChange }: SelectH1TagProps) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select HotList tag" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="AIT">A.I.T</SelectItem> 
          <SelectItem value="RTI">R.T.I</SelectItem>
          <SelectItem value="EDI">EDI</SelectItem>
          <SelectItem value="NCR">NCR</SelectItem>
          <SelectItem value="AT">AT</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
