import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, ...checkboxProps } = props;

  return (
    <>
      <RadixCheckbox.Root {...checkboxProps} className="checkbox">
        <RadixCheckbox.Indicator>
          <FontAwesomeIcon icon={faCheck} />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && <label>{label}</label>}
    </>
  );
};
