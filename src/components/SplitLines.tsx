import { classList } from '../utils';


type SplitLinesProps = {
  className?: string,
  text: string,
};

/* eslint-disable react/no-array-index-key */
export default function SplitLines({ className, text }: SplitLinesProps) {
  return text.split('\n')
    .map((line, i) => <p key={i} className={classList('my-4', className)}>{line}</p>);
}
