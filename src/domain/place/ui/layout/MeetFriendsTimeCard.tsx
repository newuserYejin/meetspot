import { Box, CardContent, Grid, Typography } from '@mui/material';
import BasicStyledCard from '../common/styles/BasicStyledCard';

interface MeetFriendsTimeCardProps {
  results: {
    name: string;
    time: number | null;
  }[];
}

const MeetFriendsTimeCard = ({ results }: MeetFriendsTimeCardProps) => {
  return (
    <BasicStyledCard>
      <CardContent>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ fontWeight: 600, fontSize: '1.2rem', mb: 2 }}
        >
          친구들 이동 시간
        </Typography>
        <Grid container spacing={2}>
          {results.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  py: 4,
                  textAlign: 'center',
                  color: 'text.secondary',
                }}
              >
                친구 이동 정보가 없습니다. 도착역을 선택해주세요.
              </Box>
            </Grid>
          ) : (
            results.map((res) => (
              <Grid key={res.name} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: 'background.default',
                    boxShadow: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.3rem',
                      color: 'primary.main',
                    }}
                  >
                    {res.time !== null ? `${res.time}분` : '정보 없음'}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 0.5,
                      color: 'text.secondary',
                      fontSize: '0.9rem',
                    }}
                  >
                    {res.name}
                  </Typography>
                </Box>
              </Grid>
            ))
          )}
        </Grid>
      </CardContent>
    </BasicStyledCard>
  );
};

export default MeetFriendsTimeCard;
