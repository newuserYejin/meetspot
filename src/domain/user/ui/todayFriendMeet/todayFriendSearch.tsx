import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

// Styled Components
const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '14px',
    backgroundColor: '#f8f9fa',
    border: 'none',
    '& fieldset': {
      border: '1px solid rgba(0,0,0,0.06)',
    },
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.primary.light}`,
    },
    '&.Mui-focused fieldset': {
      border: `2px solid ${theme.palette.custom.secondary}`,
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '14px 16px',
  }
}));

const SearchResultCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  marginBottom: theme.spacing(1.5),
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    borderColor: theme.palette.custom.secondary,
    backgroundColor: '#f8f9ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(108, 92, 231, 0.12)'
  }
}));

const SearchCardContent = styled(CardContent)({
  padding: '16px 20px !important'
});

const LineChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.7rem',
  height: 22,
  borderRadius: '11px',
  backgroundColor: 'rgba(108, 92, 231, 0.08)',
  color: theme.palette.custom.secondary,
  border: '1px solid rgba(108, 92, 231, 0.12)',
  '& .MuiChip-label': {
    padding: '0 8px',
    fontWeight: 500
  }
}));

const EmptyStateBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(5, 2),
  backgroundColor: '#f8f9fa',
  borderRadius: '12px',
  border: '1px solid rgba(0,0,0,0.06)'
}));

// Props 인터페이스
interface FriendSearchProps {
  onFriendSelect: (stationName: string) => void;
  placeholder?: string;
  maxResults?: number;
}

interface Friend {
    name:string
}

const friends = [
    "우석","예영","시영","예진"
]

const todayFriendSearch: React.FC<FriendSearchProps> = ({
  onFriendSelect,
  placeholder = "등록 하신 친구 이름을 검색해보세요",
  maxResults = 10
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Friend[]>([]);

  // 검색 기능
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    // stationConfig의 DATA에서 검색
    const filtered = friends.filter((friend: string) => 
        friend.toLowerCase().includes(query.toLowerCase())
    )
    .map(friend => ({ name: friend })) // Friend 인터페이스에 맞게 변환
    .slice(0, maxResults);
    
    setSearchResults(filtered);
  };

  return (
    <Box>
      {/* 검색 입력 */}
      <SearchTextField
        fullWidth
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1.5, color: 'action.active' }} />
        }}
        sx={{ mb: 3 }}
      />

      {/* 검색 결과 */}
      {searchResults.length > 0 && (
        <Box>
            {searchResults.map((friend, index) => (
            <SearchResultCard 
                key={`${friend.name}-${index}`} // Friend는 name만 있으므로 index 추가
                onClick={() => onFriendSelect(friend.name)}
            >
                <SearchCardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="h6" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
                    {friend.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    친구
                </Typography>
                </SearchCardContent>
            </SearchResultCard>
            ))}
            
            {/* 더 많은 결과가 있을 때 안내 */}
            {friends.filter((friend: string) =>
            friend.toLowerCase().includes(searchQuery.toLowerCase())
            ).length > maxResults && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                더 많은 결과가 있습니다. 검색어를 더 구체적으로 입력해보세요.
            </Typography>
            )}
        </Box>
        )}

      {/* 검색했지만 결과가 없을 때 */}
      {searchQuery.trim() !== '' && searchResults.length === 0 && (
        <EmptyStateBox>
          <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
            "{searchQuery}"에 대한 검색 결과가 없습니다.
          </Typography>
        </EmptyStateBox>
      )}
    </Box>
  );
};

export default todayFriendSearch;