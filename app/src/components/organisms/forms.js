export const INPUT_MAP = {
    string: props => <Text {...props} />,
    number: props => <Text {...props} />,
    url: props => <Text {...props} />,
    richText: props => <RichText {...props} />,
    select: props => <Select {...props} />
  }