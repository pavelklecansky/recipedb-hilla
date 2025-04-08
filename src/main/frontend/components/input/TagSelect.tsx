import BasicTagResponse from "Frontend/generated/cz/klecansky/recipedb/tag/endpoints/response/BasicTagResponse";
import { TagEndpoint } from "Frontend/generated/endpoints";
import { Option } from "Frontend/types/core.types";
import { createOption } from "Frontend/utils/core.utils";
import { useEffect, useState } from "react";
import Select, { MultiValue } from "react-select";

interface TagSelectProps {
  name: string;
  className?: string | undefined;
  value?: BasicTagResponse[];
  onChange?: (values: BasicTagResponse[]) => void;
  onBlur?: (name: string, values: boolean) => void;
}

export default function TagSelect({
  name,
  className,
  value,
  onChange,
  onBlur,
}: TagSelectProps) {
  const [options, setOptions] = useState<BasicTagResponse[]>([]);
  const [optionsString, setOptionsString] = useState<readonly Option[]>([]);
  const [selectOptions, setSelectOptions] = useState<Option[]>([]);

  const handleChange = (selectedOption: MultiValue<Option>) => {
    setSelectOptions([...selectedOption]);
    value = options.filter((option) =>
      selectedOption.map((selected) => selected.value).includes(option.name),
    );
    if (onChange) {
      onChange(value);
    }
  };

  const handleBlur = () => {
    if (onBlur) {
      onBlur(name, true);
    }
  };

  function loadTags() {
    TagEndpoint.findAll().then((tags) => {
      setOptions(tags);
      setOptionsString(tags.map((value) => createOption(value.name)));
    });
  }

  useEffect(() => {
    loadTags();
  }, []);

  return (
    <>
      <Select
        name={name}
        className={className}
        isMulti
        options={optionsString}
        defaultValue={value?.map((tags) => createOption(tags.name))}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </>
  );
}
