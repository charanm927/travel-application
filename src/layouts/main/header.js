import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import Label from 'src/components/label';
import Logo from 'src/components/logo';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import { bgBlur } from 'src/theme/css';

import HeaderShadow from '../common/header-shadow';
import { HEADER } from '../config-layout';

import { navConfig } from './config-navigation';
import NavDesktop from './nav/desktop';
import NavMobile from './nav/mobile';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{ height: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />

            <Link href="#">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v2.1.0
              </Label>
            </Link>
          </Box>

          {mdUp && <NavDesktop data={navConfig} />}

          {/* <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            <Stack spacing={1} direction="row" alignItems="center">
              <Searchbar />

              <SettingsButton />
            </Stack>

            {mdUp && (
              <Button
                variant="contained"
                color="inherit"
                href={paths.zoneStore}
                target="_blank"
                rel="noopener"
              >
                Buy Now
              </Button>
            )}
          </Stack> */}

          {!mdUp && <NavMobile data={navConfig} />}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}

Header.propTypes = {
  headerOnDark: PropTypes.bool,
};
