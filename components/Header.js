import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SpaceFiller from "./SpaceFiller";


const TRANSPARENT = "transparent";

const Header = ({
    headerLeftElement,
    headerCenterElement,
    headerRightElement,
    backgroundColor,
    rightLayoutCallback,
    ...props
  }) => {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: safeAreaInsets.top,
          height: 70 + safeAreaInsets.top,
        },
      ]}
      {...props}
    >
      <View style={styles.headerSmallElement}>{headerLeftElement}</View>
      <View style={styles.headerMainElement}>{headerCenterElement}</View>
      <View
        style={styles.headerSmallElement}
        onLayout={(event) => {
          //to get component position for highlight overlay
          rightLayoutCallback(event);
        }}
      >
        {headerRightElement}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 7,
    width: "100%",
    zIndex: 1,
  },
  headerMainElement: {
    flex: 1,
  },
  headerSmallElement: {
    alignItems: "center",
    height: 45,
    justifyContent: "center",
    width: 45,
  },
});

Header.propTypes = {
  headerLeftElement: PropTypes.element,
  headerCenterElement: PropTypes.element,
  headerRightElement: PropTypes.element,
  horizontalPaddingMode: PropTypes.oneOf(["form", "screen", "custom"]),
  horizontalPaddingCustomLeftValue: PropTypes.number,
  horizontalPaddingCustomRightValue: PropTypes.number,
  backgroundColor: PropTypes.string,
  rightLayoutCallback: PropTypes.func,
};

Header.defaultProps = {
  headerLeftElement: <SpaceFiller width={45} height={45} />,
  headerCenterElement: <SpaceFiller />,
  headerRightElement: <SpaceFiller width={45} height={45} />,
  horizontalPaddingMode: "screen",
  horizontalPaddingCustomLeftValue: 0,
  horizontalPaddingCustomRightValue: 0,
  backgroundColor: TRANSPARENT,
  rightLayoutCallback: () => {},
};

export default React.memo(Header);
