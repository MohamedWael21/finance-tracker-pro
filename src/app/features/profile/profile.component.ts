import { Component, inject, signal, computed, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';
import { ToastService } from '../../core/services/toast.service';
import { Input as AppInput } from '../../shared/components/ui/input/input';
import { Button } from '../../shared/components/ui/button/button';
import { Modal } from '../../shared/components/ui/modal/modal';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from './models/types';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, AppInput, Button, Modal],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private toast = inject(ToastService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  profile = signal<UserProfile | null>(null);
  isLoadingProfile = signal(false);

  avatarPreviewUrl = signal<string | null>(null);
  avatarSelectedFile: File | null = null;
  isUploadingAvatar = signal(false);
  isDeletingAvatar = signal(false);

  isEditingProfile = signal(false);
  isUpdatingProfile = signal(false);

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  editName = '';
  editEmail = '';

  nameError = '';
  emailError = '';

  showPasswordForm = signal(false);
  isChangingPassword = signal(false);

  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  oldPasswordError = '';
  newPasswordError = '';
  confirmPasswordError = '';

  isDeleteModalOpen = signal(false);
  deleteConfirmText = signal('');
  isDeletingAccount = signal(false);
  readonly DELETE_PHRASE = 'DELETE';

  avatarUrl = computed(() => this.profile()?.avatar?.secure_url ?? null);

  initials = computed(() => {
    const name = this.profile()?.name ?? '';
    return (
      name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2) || '?'
    );
  });

  isDeleteConfirmed = computed(() => this.deleteConfirmText() === this.DELETE_PHRASE);

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.isLoadingProfile.set(true);
    this.userService.getProfile().subscribe({
      next: (res) => {
        this.profile.set(res.profile);
        this.syncToLocalStorage(res.profile);
        this.isLoadingProfile.set(false);
      },
      error: (err) => {
        this.toast.error(this.extractMessage(err, 'Failed to load profile'));
        this.isLoadingProfile.set(false);
      },
    });
  }

  startEditingProfile() {
    const p = this.profile();
    this.editName = p?.name ?? '';
    this.editEmail = p?.email ?? '';
    this.nameError = '';
    this.emailError = '';
    this.isEditingProfile.set(true);
  }

  cancelEditingProfile() {
    this.isEditingProfile.set(false);
    this.nameError = '';
    this.emailError = '';
  }

  validateProfileForm(): boolean {
    let valid = true;
    this.nameError = '';
    this.emailError = '';

    if (!this.editName || this.editName.trim().length < 3) {
      this.nameError = 'Name must be at least 3 characters';
      valid = false;
    } else if (this.editName.trim().length > 30) {
      this.nameError = 'Name must be at most 30 characters';
      valid = false;
    }

    if (!this.editEmail) {
      this.emailError = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.editEmail)) {
      this.emailError = 'Please enter a valid email address';
      valid = false;
    }

    return valid;
  }

  submitProfile() {
    if (!this.validateProfileForm()) return;

    this.isUpdatingProfile.set(true);
    this.userService
      .updateProfile({ name: this.editName.trim(), email: this.editEmail.trim() })
      .subscribe({
        next: (res) => {
          this.profile.set(res.updatedProfile);
          this.syncToLocalStorage(res.updatedProfile);
          this.toast.success('Profile updated successfully');
          this.isEditingProfile.set(false);
          this.isUpdatingProfile.set(false);
        },
        error: (err) => {
          this.toast.error(this.extractMessage(err, 'Failed to update profile'));
          this.isUpdatingProfile.set(false);
        },
      });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.prepareAvatarPreview(file);
  }

  private prepareAvatarPreview(file: File) {
    this.avatarSelectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => this.avatarPreviewUrl.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  cancelAvatarPreview() {
    this.avatarPreviewUrl.set(null);
    this.avatarSelectedFile = null;
    const input = this.fileInput.nativeElement;
    if (input) input.value = '';
  }

  uploadAvatar() {
    if (!this.avatarSelectedFile) return;
    this.isUploadingAvatar.set(true);
    this.userService.uploadAvatar(this.avatarSelectedFile).subscribe({
      next: (res) => {
        this.profile.set(res.user);
        this.syncToLocalStorage(res.user);
        this.avatarPreviewUrl.set(null);
        this.avatarSelectedFile = null;
        this.toast.success('Avatar uploaded successfully');
        this.isUploadingAvatar.set(false);
      },
      error: (err) => {
        this.toast.error(this.extractMessage(err, 'Failed to upload avatar'));
        this.isUploadingAvatar.set(false);
      },
    });
  }

  deleteAvatar() {
    this.isDeletingAvatar.set(true);
    this.userService.deleteAvatar().subscribe({
      next: (res) => {
        this.profile.set(res.user);
        this.syncToLocalStorage(res.user);
        this.toast.success('Avatar removed');
        this.isDeletingAvatar.set(false);
      },
      error: (err) => {
        this.toast.error(this.extractMessage(err, 'Failed to remove avatar'));
        this.isDeletingAvatar.set(false);
      },
    });
  }

  togglePasswordForm() {
    this.showPasswordForm.update((v) => !v);
    if (!this.showPasswordForm()) {
      this.resetPasswordFields();
    }
  }

  cancelPasswordChange() {
    this.showPasswordForm.set(false);
    this.resetPasswordFields();
  }

  private resetPasswordFields() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.oldPasswordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';
  }

  validatePasswordForm(): boolean {
    let valid = true;
    this.oldPasswordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';

    if (!this.oldPassword || this.oldPassword.length < 6) {
      this.oldPasswordError = 'Current password must be at least 6 characters';
      valid = false;
    }

    if (!this.newPassword || this.newPassword.length < 6) {
      this.newPasswordError = 'New password must be at least 6 characters';
      valid = false;
    }

    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your new password';
      valid = false;
    } else if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
      valid = false;
    }

    return valid;
  }

  submitChangePassword() {
    if (!this.validatePasswordForm()) return;

    this.isChangingPassword.set(true);
    this.userService
      .changePassword({ oldPassword: this.oldPassword, newPassword: this.newPassword })
      .subscribe({
        next: () => {
          this.toast.success('Password changed successfully');
          this.cancelPasswordChange();
          this.isChangingPassword.set(false);
        },
        error: (err) => {
          this.toast.error(this.extractMessage(err, 'Failed to change password'));
          this.isChangingPassword.set(false);
        },
      });
  }

  openDeleteModal() {
    this.deleteConfirmText.set('');
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
    this.deleteConfirmText.set('');
  }

  confirmDeleteAccount() {
    if (!this.isDeleteConfirmed()) return;
    this.isDeletingAccount.set(true);
    this.userService.deleteAccount().subscribe({
      next: () => {
        this.toast.success('Account deleted successfully');
        this.closeDeleteModal();
        this.authService.logout();
      },
      error: (err) => {
        this.toast.error(this.extractMessage(err, 'Failed to delete account'));
        this.isDeletingAccount.set(false);
      },
    });
  }

  private syncToLocalStorage(profile: any) {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const merged = { ...JSON.parse(stored), ...profile };
        localStorage.setItem('user', JSON.stringify(merged));
      } catch {}
    }
  }

  private extractMessage(err: any, fallback: string): string {
    const raw: string = err?.message ?? '';
    const match = raw.match(/Message: (.+)/);
    return match ? match[1].trim() : fallback;
  }
}
