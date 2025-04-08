import Measurement from "Frontend/generated/cz/klecansky/recipedb/recipe/io/Measurement";
import { Option } from "Frontend/types/core.types";
import { createOption, ToArray } from "Frontend/utils/core.utils";
import { useState } from "react";
import Select, { SingleValue } from "react-select";

interface TagSelectProps {
  name: string;
  className?: string | undefined;
  value?: Measurement;
  onChange?: (values: Measurement) => void;
  onBlur?: (name: string, values: boolean) => void;
}

export default function TagSelect({
  name,
  className,
  value,
  onChange,
  onBlur,
}: TagSelectProps) {
  const [optionsString, setOptionsString] = useState<readonly Option[]>(
    ToArray(Measurement).map((value) => createOption(value)),
  );

  const handleChange = (selectedOption: SingleValue<Option>) => {
    let measurementElement: Measurement = selectedOption?.value as Measurement;
    if (onChange) {
      onChange(measurementElement);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(name, true);
    }
  };

  return (
    <>
      <Select
        name={name}
        className={className}
        options={optionsString}
        defaultValue={createOption(value ?? Measurement.gram)}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
}
