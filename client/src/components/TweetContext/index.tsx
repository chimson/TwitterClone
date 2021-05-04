import * as React from "react";
import { Tweet } from "../../generated/graphql";

interface IContext {
  tweet: Tweet;
  userId: string;
  prevTweet?: Tweet | null;
}

const Context = React.createContext<IContext | null>(null);

interface TweetProviderProps {}

export const TweetProvider: React.FC<
  TweetProviderProps & IContext
> = React.memo(
  ({ ...props }) => {
    return (
      <Context.Provider value={{ ...props }}>{props.children}</Context.Provider>
    );
  },
  (prevProps, nextProps) => prevProps.tweet === nextProps.tweet
);

export const useTweet = () => {
  const context = React.useContext(Context)!;
  if (!context) {
    throw new Error("You're using TweetContext outside of TweetProvider.");
  }
  return { ...context };
};