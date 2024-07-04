import React, { useEffect } from "react";
import { topicDatas } from "../../constants/topicDatas";
import { TextField, MenuItem } from "../../styles/mui";

interface TopicSelectProps {
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
}

const TopicSelect: React.FC<TopicSelectProps> = ({ selectedTopic, setSelectedTopic }) => {
  useEffect(() => {
    if (!selectedTopic && topicDatas.length > 0) {
      setSelectedTopic(topicDatas[0].value);
    }
  }, [selectedTopic, setSelectedTopic]);

  return (
    <div className="block">
      <p className="text-lg font-semibold mb-2">주제</p>
      <TextField
        select
        value={selectedTopic || ""}
        onChange={(e) => setSelectedTopic(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 2,
          bgcolor: "background.paper",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "skyblue",
            },
            "&:hover fieldset": {
              borderColor: "skyblue",
            },
            "&.Mui-focused fieldset": {
              borderColor: "skyblue",
            },
          },
        }}
      >
        {topicDatas.map((topic) => (
          <MenuItem key={topic.label} value={topic.value}>
            {topic.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default TopicSelect;
