type SplitLinesProps = {
  text: string,
};

/* eslint-disable react/no-array-index-key */
export default function SplitLines({ text }: SplitLinesProps) {
  return text.split('\n')
    .map((line, i) => <p key={i} className='my-2'>{line}</p>);
}
