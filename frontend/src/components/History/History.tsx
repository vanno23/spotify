import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import historyService from "../../storedData/historyService";
import Container from "../Container/Container";
import spotifyApi from "../../api/spotifyApi";

const History = () => {
  const user = useSelector((state: any) => state.user);
  const historyItems = useSelector((state: any) => state.historyItems);
  const [historyData, setHistoryData] = useState<any[]>();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLikedItems = async () => {
      await historyService.getHistoryItems(user?.user?.token, dispatch);
    };

    fetchLikedItems();
  }, [dispatch, user?.user?.token]);

  useEffect(() => {
    const fetchLikedData = async () => {
      const responses = await Promise.all(
        historyItems.historyItems.map(
          async (item: { itemType: string; itemId: string }) => {
            return await spotifyApi.getBrowse(
              `${item.itemType}s/${item.itemId}`
            );
          }
        )
      );
      setHistoryData(responses.reverse());
    };
    fetchLikedData();
  }, [historyItems.historyItems, user.user]);

  return historyData && historyData.length > 0 ? (
    <Container title="Recent searches" data={historyData} page={"search"} />
  ) : (
    <div></div>
  );
};

export default History;
