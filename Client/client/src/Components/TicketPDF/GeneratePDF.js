import React from "react";
import { Page, View, Text, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    width: "210mm",
    height: "297mm",
    padding: "10mm",
    // alignContent: "center",
    // alignItems: "center",
  },
  transactionalDetails: {
    display: "flex",
    width: "70%",
    justifyContent: "center",
    alignContent: "center",
  },
  table: {
    width: "100%",
  },
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
  },
  tableCol: {
    width: "33.33%",
    borderRightWidth: 1,
    borderRightColor: "#000",
    padding: 8,
    textAlign: "center",
  },
  lastTableCol: {
    width: "33.33%",
    padding: 8,
    textAlign: "center",
  },
  noBorderRow: {
    borderBottomWidth: 0,
  },
  tripDetails: {
    display: "flex",
    width: "70%",
    justifyContent: "center",
  },
});

const GeneratePDF = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.transactionalDetails}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text>PNR No</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Booking ID</Text>
              </View>
              <View style={styles.lastTableCol}>
                <Text>Transaction ID</Text>
              </View>
            </View>
            {/* Data Rows */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Data 1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Data 2</Text>
              </View>
              <View style={styles.lastTableCol}>
                <Text>Data 3</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ color: "black", marginTop: 150, display: "flex" }}>
          Trip Details
        </View>
        <View style={styles.tripDetails}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={styles.tableCol}>
                <Text>PNR No</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Booking ID</Text>
              </View>
              <View style={styles.lastTableCol}>
                <Text>Transaction ID</Text>
              </View>
            </View>
            {/* Data Rows */}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text>Data 1</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>Data 2</Text>
              </View>
              <View style={styles.lastTableCol}>
                <Text>Data 3</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default GeneratePDF;
