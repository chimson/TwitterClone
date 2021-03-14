import * as React from "react";
import {
  HoverContainer,
  Absolute,
  SpanContainer,
  BaseStylesDiv,
} from "../../../styles";
import { NavWrapper, NavItem } from "../../../pages/ProfilePage/Profile/styles";

interface Props {
  data: Array<{ title: string; body: any }>;
}

export const Tabs: React.FC<Props> = ({ data }) => {
  const [openIndex, setOpenIndex] = React.useState([0]);
  return (
    <BaseStylesDiv flexGrow flexColumn>
      <NavWrapper>
        {data.map((item, index) => (
          <BaseStylesDiv
            flexGrow
            style={{ position: "unset" }}
            key={index}
            flexColumn
          >
            <NavItem
              key={index}
              style={
                openIndex.includes(index)
                  ? { borderBottom: "2.5px solid var(--colors-button)" }
                  : {}
              }
            >
              <HoverContainer stretch>
                <Absolute
                  noMargin
                  noBorderRadius
                  onClick={() => setOpenIndex([index])}
                />
                <SpanContainer grey bold style={{ display: "block" }}>
                  <span>{item.title}</span>
                </SpanContainer>
              </HoverContainer>
            </NavItem>
          </BaseStylesDiv>
        ))}
      </NavWrapper>
      {data!.map((_, index) =>
        openIndex.includes(index) ? (
          <BaseStylesDiv flexGrow key={index} flexColumn>
            <BaseStylesDiv flexGrow flexColumn>
              {data[index].body}
            </BaseStylesDiv>
          </BaseStylesDiv>
        ) : null
      )}
    </BaseStylesDiv>
  );
};