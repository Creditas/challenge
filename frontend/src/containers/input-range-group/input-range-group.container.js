import { ChallengeInput } from '../../components/input/input.component';
import { ChallengeRange } from '../../components/range/range.component';

export const ChallengeInputRangeGroup = props => {
  return `
 <div class="field-group">
  <div class="field">
    ${ChallengeInput({
      value: props.value,
      id: props.id,
      text: props.label,
      onChange: event => {
        const value = event.target.value;
        props.onChange(
          value < props.minValue
            ? props.minValue
            : value > props.maxValue
            ? props.maxValue
            : value
        );
      }
    })}
  </div>
  <div class="field">
    ${ChallengeRange({
      max: props.maxValue,
      min: props.minValue,
      value:
        ((props.value - props.minValue) / (props.maxValue - props.minValue)) *
        100,
      id: `${props.id}-range`,
      onChange: event => {
        props.onChange(
          ((props.maxValue - props.minValue) * event.target.value) / 100 +
            props.minValue
        );
      }
    })}
  </div>
</div>
  `;
};
