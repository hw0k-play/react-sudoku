import React from 'react';
import styled from 'styled-components';

type StatProps = {
  title: string,
  value: string,
  prefix?: string,
  suffix?: string
};

const Wrapper = styled.div`
  padding: 1rem;
  border: 1px solid var(--oc-gray-4);
`;

const TitleWrapper = styled.div`
  font-size: 0.75rem;
  color: var(--oc-gray-7);
  margin-bottom: 0.25rem;
`;

const ValueWrapper = styled.div`
  font-weight: bolder;
`;

const PrefixWrapper = styled.span`
`;

const SuffixWrapper = styled.span`
  font-size: 0.75rem;
`;

const Stat: React.SFC<StatProps> = props => {
  return (
    <Wrapper>
      <TitleWrapper>
        {props.title}
      </TitleWrapper>
      <ValueWrapper>
        { props.suffix && (
          <PrefixWrapper>
            {props.prefix}
          </PrefixWrapper>
        )}
        {props.value}
        { props.suffix && (
          <SuffixWrapper>
            {props.suffix}
          </SuffixWrapper>
        )}
      </ValueWrapper>
    </Wrapper>
  );
};

export default Stat;
